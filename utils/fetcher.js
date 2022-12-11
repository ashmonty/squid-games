import fetch  from "node-fetch" ;
import logger from './logger.js';
import boss  from 'boss-js';
import {paraseContent} from './boss/splatoonparaser';
import config from '../config.json' assert {type: 'json'};
import Byaml from './boss/byaml';


const BOSS_AES_KEY = config.BOSS_AES_KEY;
const BOSS_HMAC_KEY = config.BOSS_HMAC_KEY;
var splatfestcache = [];
var rotationcache = [];

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
   if (ShouldRefresh()) {
    try {
   const files = await httpGetAsync(optdat2,true);
   const maininfofile = await httpGetAsync(files[0]);
   const mainfobymal = boss.decrypt(Buffer.from(maininfofile),BOSS_AES_KEY,BOSS_HMAC_KEY);
   const mainfilearray =new Byaml(mainfobymal.content).root;
   splatfestcache = paraseContent("SplatfestByaml",mainfilearray,locale);
    } catch (c) {
        logger.warn(c);
        return null;
    }
   }
   return splatfestcache;
   //TODO Get the Splatfest Cover
}

export async function getMapRotations(locale){
    if (ShouldRefresh()) {
     try {
    const file = await httpGetAsync(schdat2,true);
    const maininfofile = await httpGetAsync(file);
    const mainfobymal = boss.decrypt(Buffer.from(maininfofile),BOSS_AES_KEY,BOSS_HMAC_KEY);
    const mainfilearray = new Byaml(mainfobymal.content).root;
    rotationcache = paraseContent("RotationByaml",mainfilearray,locale);
     } catch (c) {
        logger.warn(c);
        return null
     }
    }
    return rotationcache;
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

function ShouldRefresh() {
    //TODO Continue this
    if (splatfestcache.length === 0 || rotationcache.length === 0) {
        return true;
    }
    return false;
}