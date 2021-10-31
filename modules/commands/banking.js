module.exports.config = {
	name: "banking",
	version : "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "",
	commandCategory: "Economy",
	usages: "banking [rỗng/history]",
	cooldowns: 0
};

module.exports.onLoad = () => {
	const fs = require("fs-extra");
	if (!fs.existsSync(__dirname + "/cache/banking.json")) fs.writeFileSync(__dirname + "/cache/banking.json", JSON.stringify([]), 'utf-8');
}

module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies}) {
      const moment = require("moment-timezone");
      var time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');
      let { senderID, messageID, threadID } = event;
	    const fs = require("fs-extra");
		  const moneydb = (await Currencies.getData(parseInt(event.senderID))).money;
      let exp = (await Currencies.getData(parseInt(event.senderID))).exp;
      if (handleReply.id == 1) {
      if (isNaN(event.body) || parseInt(event.body) < 0) return api.sendMessage("[BANKING] Đây không phải 1 con số",threadID);
    	if (parseInt(exp) < parseInt(event.body)) return api.sendMessage(`[BANKING] Số EXP của bạn không đủ`, event.threadID, event.messageID); 
      else {
			  await  Currencies.decreaseEXP(parseInt(event.senderID), parseInt(event.body))
        await  Currencies.increaseMoney(parseInt(event.senderID), parseInt(event.body))
    	  api.sendMessage(`[BANKING] Bạn đã chuyển đổi thành công ${event.body} EXP sang ${parseInt(event.body)} LE`, event.threadID, event.messageID);      
        return fs.readFile(__dirname + "/cache/banking.json", "utf-8", (err, data) => {
        if (err) throw err;
        var oldData = JSON.parse(data);
        if (!Object.keys(oldData).some(item => item == event.senderID.toString())) {
          oldData[event.senderID] = []
          oldData[event.senderID].push(`${event.body} EXP -> ${event.body} LE [${time}]`);
            return fs.writeFileSync(__dirname + "/cache/banking.json", JSON.stringify(oldData, null, 8));
        } else {
          oldData[event.senderID].push(`${event.body} EXP -> ${event.body} LE [${time}]`);
          return fs.writeFile(__dirname + "/cache/banking.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : ``);
        }
		    });
      }
      }
      else if (handleReply.id == 2) {
      if (isNaN(event.body) || parseInt(event.body) < 0) return api.sendMessage("[BANKING] Đây không phải 1 con số",threadID);
      if (event.body % 2 != 0) return api.sendMessage("[BANKING] Cần là số chẵn",threadID);
    	if (parseInt(moneydb) < parseInt(event.body)) return api.sendMessage(`[BANKING] Số LE của bạn không đủ`, event.threadID, event.messageID); 
      else {
        await  Currencies.increaseEXP(parseInt(event.senderID), parseInt(event.body / 20))
        await  Currencies.decreaseMoney(parseInt(event.senderID), parseInt(event.body))
    	  api.sendMessage(`[BANKING] Bạn đã chuyển đổi thành công ${event.body} LE sang ${parseInt(event.body / 20)} EXP`, event.threadID, event.messageID);      
        return fs.readFile(__dirname + "/cache/banking.json", "utf-8", (err, data) => {
        if (err) throw err;
        var oldData = JSON.parse(data);
        if (!Object.keys(oldData).some(item => item == event.senderID.toString())) {
          oldData[event.senderID] = []
          oldData[event.senderID].push(`${event.body} LE -> ${event.body / 20} EXP [${time}]`);
            return fs.writeFileSync(__dirname + "/cache/banking.json", JSON.stringify(oldData, null, 8));
        } else {
          oldData[event.senderID].push(`${event.body} LE -> ${event.body / 20} EXP [${time}]`);
          return fs.writeFile(__dirname + "/cache/banking.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : ``);
        }
		    });
      }
      }
      switch (event.body) {
        case "1": {
            api.sendMessage("[BANKING] Reply tin nhắn này với số EXP cần đổi sang LE!\nGiá: 1 EXP = 1 LE", event.threadID, async (err, info) => {
                client.handleReply.push({ 
                    id: 1,
                    name: this.config.name,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID,
                    type: "reply"
                });
            })
            break;
        }
        case "2": {
            api.sendMessage("[BANKING] Reply tin nhắn này với số LE cần đổi sang EXP!\nGiá: 20 LE = 1 EXP", event.threadID, async (err, info) => {
                client.handleReply.push({ 
                    id: 2,
                    name: this.config.name,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID,
                    type: "reply"
                });
            }) 
            break;
        }
        default: {
          return api.sendMessage("[BANKING] Đàng hoàng coi tml này",threadID);
            break;
        }
    }
}

module.exports.run = async function({ api, event, args, Currencies, utils, Users, Threads,__GLOBAL,client }) {
	  const fs = require("fs-extra");
    let { senderID, messageID, threadID } = event;
    let data = (await Users.getData(senderID));
    let thread = (await Threads.getData(threadID));
		let moneydb = (await Currencies.getData(parseInt(event.senderID))).money;
    let exp = (await Currencies.getData(parseInt(event.senderID))).exp;
    if (!args[0]) return api.sendMessage(`======[BANKING]======\n1. Chuyển đổi EXP ra LE\n2. Chuyển đổi LE ra EXP\n\n-Số tiền hiện có: ${moneydb} LE\n-Số EXP hiện có: ${exp}\n\nReply với số thích hợp để sử dụng.`, threadID, async (err, info) => {
                client.handleReply.push({ 
                    name: this.config.name,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID,
                    type: "reply"
                });
    }) 
    else if (args[0] == "history"){
    let msg = []
    var mention = Object.keys(event.mentions)[0];
    var banking = JSON.parse(fs.readFileSync(__dirname + "/cache/banking.json"))[(!mention) ? (!args[2]) ? (event.type == "message_reply") ? event.messageReply.senderID : event.senderID  : args[1] : mention];
		if (!banking) return api.sendMessage(`[BANKING] ${(!mention) ? (!args[2]) ? (event.type == "message_reply") ? event.messageReply.senderID : `Bạn`  : args[1] : mention} chưa có cuộc giao dịch nào`, event.threadID, event.messageID);
            for (const history of banking) {
        msg.push(history)
       }      
      return api.sendMessage(`[BANKING]\nLịch sử giao dịch của ${(!mention) ? (!args[2]) ? (event.type == "message_reply") ? event.messageReply.senderID : `bạn`  : args[1] : mention}:\n\n${msg.join(`\n`)}`, event.threadID, event.messageID);
  }
} 

