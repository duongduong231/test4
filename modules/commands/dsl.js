module.exports.config = {
	name: "dsl",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "",
	commandCategory: "other",
	usages: "",
	cooldowns: 0,
	dependencies: ['request']
};

module.exports.handleReply = async function({ event, api, args }) {
}

module.exports.run = async function({ event, api, args }) {
const fs = require('fs-extra');
const request = require('request');
const https = require("https");
const axios = require("axios");
const stringSimilarity = require("string-similarity");
var dsl = JSON.parse(fs.readFileSync(__dirname + `/cache/dsl.json`)); 
var msg = "";

if (args[0] == "all") {
  for (let i = 0; i < dsl.student.length; i++) {
    msg += `╔${i+1} \n║${dsl.student[i].name} \n╚${dsl.student[i].gender} - ${dsl.student[i].birthday}\n`
  }
  api.sendMessage(`DANH SÁCH HỌC SINH A2(21/22)\n` + msg,event.threadID)
} else if (args[0] == "random") {
  let stt = Math.floor(Math.random() * 46);
  if (typeof dsl.student[stt].image == "undefined" || dsl.student[stt].image.length < 1) return api.sendMessage(`╔${stt+1} \n║${dsl.student[stt].name} \n╚${dsl.student[stt].gender} - ${dsl.student[stt].birthday}\n`,event.threadID)
  else {
    var path = [];
    for (let i = 0; i < dsl.student[stt].image.length; i++) {
    let img = (await axios.get( `${dsl.student[stt].image[i]}`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync( __dirname + `/cache/dsl${i}.png`, Buffer.from(img, "utf-8"));
    path.push(fs.createReadStream( __dirname + `/cache/dsl${i}.png`));
    }
    var mainpath = [...path];
    api.sendMessage({body:`╔${stt+1} \n║${dsl.student[stt].name} \n╚${dsl.student[stt].gender} - ${dsl.student[stt].birthday}\n`,attachment: mainpath}, event.threadID);	
  }
} 
  else if (args[0] == "image"){
    if (event.type != "message_reply") return;
			if(event.type == "message_reply" && event.messageReply.attachments[0].type == "photo" ) {
         if (!args[1]) return; 
         if (!dsl.student[parseInt(args[1])-1]) return;
          var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err))))
          var image = dsl.student[parseInt(args[1])-1].image
          if (typeof image == "undefined" || image.length < 1) image = dsl.student[parseInt(args[1])-1].image = [];
          var att = Object.keys(event.messageReply.attachments); 
          for (let i = 0; i < att.length; i++) {
            let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
            image.push(link)
          }
          console.log("DONE!")
          return fs.writeFileSync(__dirname + `/cache/dsl.json`, JSON.stringify(dsl, null, 2));
		  }  
  } else if (!isNaN(args[0])){
      if (!dsl.student[parseInt(args[0])-1]) return;
      if (typeof dsl.student[parseInt(args[0]) - 1].image == "undefined" || dsl.student[parseInt(args[0]) - 1].image.length < 1) return api.sendMessage(`╔${parseInt(args[0])} \n║${dsl.student[parseInt(args[0]) - 1].name} \n╚${dsl.student[parseInt(args[0]) - 1].gender} - ${dsl.student[parseInt(args[0]) - 1].birthday}\n`,event.threadID)
  else {
    if (!dsl.student[parseInt(args[0])-1]) return;
    var path = [];
    for (let i = 0; i < dsl.student[parseInt(args[0]) - 1].image.length; i++) {
    let img = (await axios.get( `${dsl.student[parseInt(args[0]) - 1].image[i]}`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync( __dirname + `/cache/dsl${i}.png`, Buffer.from(img, "utf-8"));
    path.push(fs.createReadStream( __dirname + `/cache/dsl${i}.png`));
    }
    var mainpath = [...path];
    return api.sendMessage({body:`╔${args[0]} \n║${dsl.student[parseInt(args[0]) - 1].name} \n╚${dsl.student[parseInt(args[0]) - 1].gender} - ${dsl.student[parseInt(args[0]) - 1].birthday}\n`,attachment: mainpath}, event.threadID);	
  }
  //api.sendMessage(`╔${args[0]} \n║${dsl.student[parseInt(args[0])-1].name} \n╚${dsl.student[parseInt(args[0])-1].gender} / ${dsl.student[parseInt(args[0])-1].birthday}\n`,event.threadID)
} else {
    var checkIn = dsl.student.map(i => i.name);
    var find = stringSimilarity.findBestMatch(args.join(" ").toUpperCase(), checkIn);
    //console.log(find)
    let text = []
      if (find.bestMatch.rating < 0.1) return console.log("ERROR")
      else if (find.bestMatch.rating >= 0.17) {
        dsl.student.forEach(item => item.name == find.bestMatch.target ? text.push(item) : "")
        if (typeof text[0].image == "undefined" || text[0].image.length < 1) return api.sendMessage(`╔${text[0].stt} \n║${text[0].name} \n╚${text[0].gender} - ${text[0].birthday}\n`,event.threadID)
  else {
    var path = [];
    for (let i = 0; i < text[0].image.length; i++) {
    let img = (await axios.get( `${text[0].image[i]}`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync( __dirname + `/cache/dsl${i}.png`, Buffer.from(img, "utf-8"));
    path.push(fs.createReadStream( __dirname + `/cache/dsl${i}.png`));
    }
    var mainpath = [...path];
    api.sendMessage({body:`╔${text[0].stt} \n║${text[0].name} \n╚${text[0].gender} - ${text[0].birthday}\n`,attachment: mainpath}, event.threadID);  
        //api.sendMessage(`╔${text[0].stt} \n║${text[0].name} \n╚${text[0].gender} - ${text[0].birthday}\n`,event.threadID)
    }      
  }
}
  }
