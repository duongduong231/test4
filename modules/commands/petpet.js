module.exports.config = {
  name: "petpet",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "other",
  usages: "",
  cooldowns: 1,
  dependencies: ["axios","pet-pet-gif","fs-extra"]
};
module.exports.run = async({api, event, args}) => {
const petPetGif = require('pet-pet-gif');
const fs = require('fs-extra');
const axios = require('axios');
const https = require("https");
let mentions = Object.keys(event.mentions)[0];
var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err))))
if (event.type == "message_reply") return;
else {//await axios.get(`https://le31.glitch.me/avt?q=${event.senderID}`);
  //let link = await short((event.messageReply.attachments[0] != "") ? (event.messageReply.attachments[0].type == "photo") ? event.messageReply.attachments[0].url : "":"");
  let animatedGif = await petPetGif(`https://graph.facebook.com/${(!mentions) ? (event.type == "message_reply") ? event.messageReply.senderID : event.senderID : mentions}/picture?width=512&height=512&access_token=EAAAAZAw4FxQIBAO9ZADL8XhuOzJhB8EwdbAcm7ZALYPQr7TEW1M9xyde4c36vvnMl5gJYSp4GwGRjHkZCdsYdnDDwgqonF6ZBPCCuFgZCEWpREXUorewfgc0Js88dmkJrMbohUNEtNwkgUgnpsPR0M9fFUkwwZCHtnBTLRYZA6RJvIpVdE1mL9AiNj8GlIdgMzUZD  `, {
    resolution: 125,//125, // The width (or height) of the generated gif
    delay: 25, // Delay between each frame in milliseconds. Defaults to 20.
    backgroundColor: "rgba(255, 255, 255, 0.2)",//"black", // Other values could be the string "rgba(123, 233, 0, 0.5)". Defaults to null - i.e. transparent.
  })
  fs.writeFileSync( __dirname + "/cache/animatedGif.gif", Buffer.from(animatedGif, "utf-8"));
  return api.sendMessage({attachment: fs.createReadStream(__dirname + `/cache/animatedGif.gif`)}, event.threadID, event.messageID );
  }
}