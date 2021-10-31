module.exports.config = {
  name: "findmusic",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "media",
  usages: "",
  cooldowns: 1,
  dependencies: ["axios"]
};

module.exports.run = async({api, event, args}) => {
  const axios = require('axios');
  const https = require("https");
  if(event.type == "message_reply" && event.messageReply.attachments[0].type == "audio" ) {
	var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err))))
 // let shortaudio = (await axios.get(`${event.messageReply.attachments[0].url}`, { responseType: "arraybuffer" })).data;
  let link = await short(event.messageReply.attachments[0].url)
  //fs.writeFileSync(__dirname + `/cache/find.m4a`, Buffer.from(shortaudio, "utf-8"));
  let res = (await axios.get(`https://api.audd.io/?url=${link}&return=lyrics,apple_music,spotify,deezer,napster&api_token=243dc32b7617144149a0fa10101ad59d`)).data
  if (res.status == "success") return api.sendMessage(`Artist: ${res.result.artist}\nBài: ${res.result.title}\nAlbum: ${res.result.album}\nNgày phát hành: ${res.result.release_date}\nLink: ${res.result.song_link}`,event.threadID)
  else return  api.sendMessage("Không tìm thấy hoặc đoạn ghi âm quá dài!",event.threadID)
  }
}