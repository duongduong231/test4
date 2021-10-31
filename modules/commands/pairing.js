module.exports.config = {
	name: "pairing",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "MewMew",
	description: "",
	commandCategory: "general",
	usages: "pairing",
	cooldowns: 10
}

module.exports.run = async ({ api, event, Users, args, __GLOBAL}) => {
  const request = require("request");
  const axios = require("axios");
	const fs = require("fs-extra");
  let all = await Users.getAll(['name', 'userID', 'gender']);
  let data = [];
  let dt = await api.getUserInfo(event.senderID);
  let s = await  dt[event.senderID].gender;

  if (args[0] == "boy") {
    for (let u in all) {
      if (all[u].gender == 2) {
        if (all[u] != event.senderID) data.push(JSON.stringify(all[u].userID))   
      }
    }
  }	
  else if (args[0] == "girl") {	
    for (let u in all) {
      if (all[u].gender == 1) {
        if (all[u] != event.senderID) data.push(JSON.stringify(all[u].userID))  
      } 
    }
  }
  else {
    for (let u in all) {
      if (s == 1 || s == 0) {
        if (all[u].gender == 2) {
        if (all[u] != event.senderID) data.push(JSON.stringify(all[u].userID))   
      }
      } else if (s == 2) {
        if (all[u].gender == 1) {
        if (all[u] != event.senderID) data.push(JSON.stringify(all[u].userID))  
        } 
      }
    }
  }


  if (data.length == 0) return api.sendMessage("Rất tiếc! Không tìm thấy nửa đời của bạn :(", event.threadID, event.messageID);
  let e = data[Math.floor(Math.random() * data.length)]
  let d = await api.getUserInfo(e);
  let a = (Math.random() * 50)+50;
  let n = await d[e].name
  let b = await d[e].gender
  let userInfo = await api.getUserInfo(e);
  let url = userInfo[e].profileUrl;
  let getAvatar = (await axios.get(`https://le31.glitch.me/avt?q=${e}`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(getAvatar, 'utf-8'));     
  api.sendMessage({ body: `======[PAIRING]======\nHọ và Tên: ${n}\nID: ${e}\nGiới tính: ${(b == 2) ? "Nam" : (b == 1) ? "Nữ" : "Gay"}\nNăm sinh: chưa xác định \nMối quan hệ: chưa xác định \nĐộ phù hợp: ${a.toFixed(2)}%\nProfile: ${url}`,
        attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);
};