module.exports.config = {
  name: "pubgquiz",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "Chọn đáp án đúng về item PUBG",
  commandCategory: "game-sp",
  usages: "pubgquiz [type]",
  cooldowns: 120,
  dependencies: ["axios"],
  info: [
		{
			key: "type => rỗng",
			prompt: "Lấy câu hỏi random (sẽ nhận được tiền nếu trả lời đúng)",
      type: "AIR",
      example: ""
		},
    {
			key: "key => rifle/srilfe/shotgun/sniper/smg/piston/machine/throw/ammo/melee/muzzle/lower-rail/upper-rail/mags/stock",
			prompt: "Lấy câu hỏi theo type",
      type: "",
      example: "rifle"
		}
	],
};

module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
    if (event.senderID == api.getCurrentUserID()) return;
    const moment = require("moment-timezone");
    let { senderID, messageID, threadID } = event;
    let name = (await Users.getData(senderID)).name;
    var money = parseInt(Math.floor(Math.random() * 50))
    switch (handleReply.type) {
		case "rifle": 
		case "srilfe":        
		case "shotgun":        
		case "sniper":        
		case "smg":
    case "piston":
    case "machine":
    case "throw":
    case "ammo":
    case "melee":
    case "muzzle":
    case "lower-rail":
    case "upper-rail":
    case "mags":    
    case "stock":{
      if(event.body.toUpperCase() == handleReply.answer_) return api.sendMessage({body :`Chúc mừng ${name} đã trả lời đúng`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID));    
      else api.sendMessage({body :`Sai rồi đáp án ${handleReply.answer_} mới đúng!`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID));    
      handleReply.splice(0, 1);
    }
    default: {
      if(event.body.toUpperCase() == handleReply.answer_) return api.sendMessage({body :`Chúc mừng ${name} đã trả lời đúng, bạn nhận được ${money} LE`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID) + Currencies.increaseMoney(event.senderID, money));    
      else return api.sendMessage({body :`Sai rồi đáp án ${handleReply.answer_} mới đúng!`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID));    
      handleReply.splice(0, 1);
    }
    }
};
/*
module.exports.event = async ({ event, api, client, Threads, handleReply, Users, Currencies }) => {
    if (event.senderID == api.getCurrentUserID()) return;
    const moment = require("moment-timezone");
    let { senderID, messageID, threadID } = event;
    let name = (await Users.getData(senderID)).name;
    var money = parseInt(Math.floor(Math.random() * 50))
    switch (handleReply.type) {
		case "rifle": 
		case "srilfe":        
		case "shotgun":        
		case "sniper":        
		case "smg":
    case "piston":
    case "machine":
    case "throw":
    case "ammo":
    case "melee":
    case "muzzle":
    case "lower-rail":
    case "upper-rail":
    case "mags":    
    case "stock":{
      if(event.body.toUpperCase() == handleReply.answer_) return api.sendMessage({body :`Chúc mừng ${name} đã trả lời đúng`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID));    
      else api.sendMessage({body :`Sai rồi đáp án ${handleReply.answer_} mới đúng!`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID));    
      handleReply.splice(0, 1);
    }
    default: {
      if(event.body.toUpperCase() == handleReply.answer_) return api.sendMessage({body :`Chúc mừng ${name} đã trả lời đúng, bạn nhận được ${money} LE`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID) + Currencies.increaseMoney(event.senderID, money));    
      else return api.sendMessage({body :`Sai rồi đáp án ${handleReply.answer_} mới đúng!`}, handleReply.threadID, () => api.unsendMessage(handleReply.messageID));    
      handleReply.splice(0, 1);
    }
    }
};
*/

module.exports.run = async function({api, event, args, client}) {
  const axios = require('axios');
  const fs = require("fs-extra");
  const {senderID, threadID, messageID} = event;
  	switch (args[0]) {
		case "rifle": 
		case "srilfe":        
		case "shotgun":        
		case "sniper":        
		case "smg":
    case "piston":
    case "machine":
    case "throw":
    case "ammo":
    case "melee":
    case "muzzle":
    case "lower-rail":
    case "upper-rail":
    case "mags":    
    case "stock":{
      let res = (await	axios.get(encodeURI(`https://ginxkin-api.herokuapp.com/api/pubg_quiz/${args[0]}`))).data;
      let pubg = (await axios.get(`${res.link}`, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/pubg.png", Buffer.from(pubg, "utf-8"));
      api.sendMessage({body:`=====[PUBG QUIZ]=====\n${res.body}\n=====[${args[0].toUpperCase()}]=====\n\nReply tin nhắn này với đáp án bạn đưa ra`,attachment: fs.createReadStream(__dirname + `/cache/pubg.png`)},event.threadID, async (err, info) => {
                    client.handleReply.push({
                        type: args[0],
                        name: this.config.name,
                        senderID: event.senderID,
                        messageID:  info.messageID,
                        replyID: event.messageID, 
                        threadID: event.threadID,
                        answer_:res.answer
                    },event.messageID);
        await new Promise(resolve => setTimeout(resolve, 1000))
        }) 
     /* api.sendMessage({body:`reply tin nhắn này với đáp án bạn đưa ra`}, event.threadID, async (err, info) => {
                    client.handleReply.push({
                        type: args[0],
                        name: this.config.name,
                        senderID: event.senderID,
                        messageID:  info.messageID,
                        replyID: event.messageID, 
                        threadID: event.threadID,
                        answer_:res.answer
                    },event.messageID);
        await new Promise(resolve => setTimeout(resolve, 1000))
        })*/     
      return fs.unlinkSync(__dirname + `/cache/pubg.png`);
		}
    default: {
      let res = (await	axios.get(encodeURI(`https://ginxkin-api.herokuapp.com/api/pubg_quiz/random`))).data;
      let pubg = (await axios.get(`${res.link}`, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/pubg.png", Buffer.from(pubg, "utf-8"));
      api.sendMessage({body:`=====[PUBG QUIZ]=====\n${res.body}\n=====[RANDOM]=====\n\nReply tin nhắn này với đáp án bạn đưa ra`,attachment: fs.createReadStream(__dirname + `/cache/pubg.png`)}, event.threadID, async (err, info) => {
                    client.handleReply.push({
                        type: "random",
                        name: this.config.name,
                        senderID: event.senderID,
                        messageID:  info.messageID,
                        replyID: event.messageID, 
                        threadID: event.threadID,
                        answer_:res.answer
                    },event.messageID);
        await new Promise(resolve => setTimeout(resolve, 1000))
        })      
      /*api.sendMessage({body:`reply tin nhắn này với đáp án bạn đưa ra`}, event.threadID, async (err, info) => {
                    client.handleReply.push({
                        type: "random",
                        name: this.config.name,
                        senderID: event.senderID,
                        messageID:  info.messageID,
                        replyID: event.messageID, 
                        threadID: event.threadID,
                        answer_:res.answer
                    },event.messageID);
        await new Promise(resolve => setTimeout(resolve, 1000))
        })    */  
      return fs.unlinkSync(__dirname + `/cache/pubg.png`);
    }
    }
}