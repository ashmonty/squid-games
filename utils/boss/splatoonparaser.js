
export function paraseContent(contenttype,content,locale){
    switch (contenttype) {
        case "SplatfestByaml":
            return paraseSplatfestByaml(content,locale);
        case "RotationByaml":
            return paraseRotationBymal(content,locale);
    }
}

function paraseSplatfestByaml(content,locale){ 
   const splatfest = {
			name: getSplatfestName(content,locale),
			start: getSplatfestTime(content)[1],
			end: getSplatfestTime(content)[2],
			art: 'https://cdn.discordapp.com/attachments/413884110667251722/1041436681133363292/handvshome.jpg',
			maps: getSplatfestMaps(content),
		};
    return splatfest;
}

function getSplatfestMaps(content) {
    const stages = content.value.Stages.value;
    let maps = [];
    for (let i = 0; i < 3;i++) {
        maps.push(mapidToMapName(stages[i].value.MapID.value));
    }
    return maps;
}

function getSplatfestName(content,locale) {
    const Teams = content.value.Teams.value;
    const teamlocale = locale.splatoon.splatfestlocale;
    const TeamAlpha = Teams[0].value.ShortName.value[teamlocale].value;
    const TeamBravo = Teams[1].value.ShortName.value[teamlocale].value;
    return `${TeamAlpha} vs ${TeamBravo}`;
}

function getSplatfestTime(content){
    const STime = content.value.Time.value;
    let UnixTime = [];
    const Types = ["Announce","Start","End","Result"];
    for (var i = 0; i < 4;i++) {
        UnixTime.push(getUnixTime(STime[Types[i]].value));
    }
    return UnixTime;
}

function getUnixTime(inputTime){
    return Math.floor(Date.parse(inputTime) / 1000);
}

function mapidToMapName(ID){
    switch (ID){
        case 0:
            return "urchinunderpass";
            
        case 1:
            return "walleyewarehouse";
                 
        case 2:
            return "saltsprayrig";
               
        case 3:
            return "arowanamall";
            
        case 4:
            return "blackbellyskatepark";
            
        case 5:
            return "camptriggerfish";
            
        case 6:
            return "portmackerel";
               
        case 7:
            return "kelpdome";
            
        case 8:
            return "moraytowers";
            
        case 9:
            return "bluefindepot";
            
        case 10:
            return "hammerheadbridge";
               
        case 11:
            return "flounderheights";
            
        case 12:
            return "museumdalfonsino";
            
        case 13:
            return "anchovgames";
            
        case 14:
            return "piranhapit";
               
        case 15:
            return "mahimahiresort";
            
        default:
            return "mahimahiresort";
            
    }
}

function gachiToRankedName(gachiRule,locale){
    return locale.splatoon.gamemodes[gachiRule]
}

function getDateOfFirstRotaion(content){
    return Math.floor(Date.parse(content.value.DateTime.value) / 1000);
}

function CalculateWhichRotation(filedate){
    const currentTime = Math.floor(Date.parse(new Date()) / 1000);
    let differnce = currentTime - filedate;

    if (differnce < 0){
        differnce = Math.abs(differnce);
    }
    const maxRotation = 4 * 180 * 3600;
    let rotationNumber = 0;
    if (differnce >= maxRotation){
        rotationNumber = 179;
        return rotationNumber;
    }

    rotationNumber = Math.floor(differnce/maxRotation * 180);  
    
    return rotationNumber;
}

function getCurrentRotations(content,locale){
  const number = CalculateWhichRotation(getDateOfFirstRotaion(content));
  let ReturnedRotation = [];
  for (let i = number;i < 180;i++){
    ReturnedRotation.push(getRotationInfoAtIndex(content,i,locale));
  }
  return ReturnedRotation;
}

function paraseRotationBymal(content,locale){
    const rotation = CalculateWhichRotation(getDateOfFirstRotaion(content));
    const battles = {
			lastChange: getLastChangeTime(content,rotation), // Unix timestamp for when the course last changed
			changeWaitSeconds: (rotation < 179) ? 14400 : 3600 * 67800, // how often the courses change in seconds
			list: getCurrentRotations(content,locale)
		};
        return battles;
}

function getLastChangeTime(content,rotationnumber){
    return getDateOfFirstRotaion(content) + rotationnumber * 4 * 3600;
}

function getRotations(content){
    return content.value.Phases.value;
}

function getRotationInfoAtIndex(content,index,locale){
    const Rotations = getRotations(content);
    const RequiredRotation = Rotations[index].value;

    let NormalMaps = [];
    NormalMaps.push(mapidToMapName(RequiredRotation.RegularStages.value[0].value.MapID.value));
    NormalMaps.push(mapidToMapName(RequiredRotation.RegularStages.value[1].value.MapID.value));
    
    let RankedMode = gachiToRankedName(RequiredRotation.GachiRule.value,locale);

    let RankedMaps = [];
    RankedMaps.push(mapidToMapName(RequiredRotation.GachiStages.value[0].value.MapID.value));
    RankedMaps.push(mapidToMapName(RequiredRotation.GachiStages.value[1].value.MapID.value));

    const ReturnedRotation = {
        regular: {
            rule: gachiToRankedName("cPnt",locale),
            maps: NormalMaps,
        },
        ranked: {
            rule: RankedMode,
            maps: RankedMaps,
        },
    };

    return ReturnedRotation;
}