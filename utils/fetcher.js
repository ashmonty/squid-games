import fetch  from "node-fetch" ;
import logger from './logger.js';
import boss  from 'boss-js';
import {paraseContent} from './boss/splatoonparaser';
import config from '../config.json' assert {type: 'json'};
import Byaml from './boss/byaml';


const BOSS_AES_KEY = config.BOSS_AES_KEY;
const BOSS_HMAC_KEY = config.BOSS_HMAC_KEY;
var splatfestarraycache = null;
var rotationarraycache = null;
var splatfestfileurl = "";
var rotationfileurl = "";

var optdat2 = "https://npts.app.pretendo.cc/p01/tasksheet/1/rjVlM7hUXPxmYQJh/optdat2?c=CA&l=en";
var schdat2 = "https://npts.app.pretendo.cc/p01/tasksheet/1/rjVlM7hUXPxmYQJh/schdat2?c=CA&l=en";

async function httpGetAsync(theUrl,parase)
{
    const response = await fetch(theUrl);
    if (response.status === 200){
        if (parase){
            const body = await response.text();
            return GrabFileUrlFromXML(body);
        }
        return response.arrayBuffer();
    }
    return null;
}

export async function getSplatfestData(locale){
    try {
   const files = await httpGetAsync(optdat2,true);
   if (splatfestfileurl === files[0]) {paraseContent("SplatfestByaml",splatfestarraycache,locale);}
   const maininfofile = await httpGetAsync(files[0]);
   const mainfobymal = boss.decrypt(Buffer.from(maininfofile),BOSS_AES_KEY,BOSS_HMAC_KEY);
   splatfestarraycache =new Byaml(mainfobymal.content).root;
   splatfestfileurl = files[0];
    } catch (c) {
        logger.warn(c);
        return null;
    }
   return paraseContent("SplatfestByaml",splatfestarraycache,locale);
   //TODO Get the Splatfest Cover
}

export async function getMapRotations(locale){
     try {
    const file = await httpGetAsync(schdat2,true);
    if (rotationfileurl === file) {paraseContent("RotationByaml",rotationarraycache,locale);}
    const maininfofile = await httpGetAsync(file);
    const mainfobymal = boss.decrypt(Buffer.from(maininfofile),BOSS_AES_KEY,BOSS_HMAC_KEY);
    rotationarraycache = new Byaml(mainfobymal.content).root;
    rotationfileurl = file;
     } catch (c) {
        logger.warn(c);
        return null
     }
    return paraseContent("RotationByaml",rotationarraycache,locale);
}

function GrabFileUrlFromXML(content){
   var files = content.split("<Files>");
   files = files[1].split("</Files>")[0];
    if (files.split("<File>").length > 2){
        //Mutiple Files
        var filesurl = [];
        for (let i = 1;i < files.split("<File>").length;i++){
            var file = files.split("<File>")[i];
            file = file.split("</File>")[0];
            var fileurl = file.split("<Url>")[1].split("</Url>")[0];
            filesurl.push(fileurl);
        }
        return filesurl;
    }
    else {
        //Single File
        file = files.split("<File>")[1];
        file = file.split("</File>")[0];
        fileurl = file.split("<Url>")[1].split("</Url>")[0];
        return fileurl;
    }
    
}

export function getNintendoRotation(status){
    if (status){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Nintendo does not have a vaild secure connection
        optdat2 = optdat2.replace("pretendo.cc","nintendo.net");
        schdat2 = schdat2.replace("pretendo.cc","nintendo.net");
    }
}