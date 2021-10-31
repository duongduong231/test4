module.exports.config = {
	name: "slut",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Go làm đĩ",
	commandCategory: "Economy",
	usages: "slut",
  cooldowns: 5,
  //dependencies: ["parse-ms"],
  envConfig: {
       cooldownTime: 1200000
  }
};

module.exports.run = async ({ event, api, Currencies, __GLOBAL }) => {
    const { readFile,readFileSync, createReadStream, createWriteStream, unlinkSync } = require("fs-extra");
    //const ms = require("parse-ms");
    
    const { threadID, messageID } = event;
    const cooldown = __GLOBAL.slut.cooldownTime;
    const data = (await Currencies.getData(event.senderID)).slutTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
        var time = cooldown - (Date.now() - data),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);
        
    return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, event.threadID, event.messageID);
    }
    
    else {
        let amount = (Math.floor(Math.random() * 1000) - 500);
        if (amount < 0) {
        return api.sendMessage(`Bạn đã đi khách nhưng bị quỵt tiền nên phải trả phòng mất ${amount} LE`, threadID, async () => {
             await Currencies.increaseMoney(event.senderID, parseInt(amount));
             await Currencies.setData(event.senderID, { slutTime: Date.now() });
        }, messageID);
        }
        else if (amount == 0) return api.sendMessage(`Bạn đã đi khách nhưng bị đánh ghen nên không nhận được xu nào`, threadID, async () =>  Currencies.setData(event.senderID, { slutTime: Date.now() }),messageID)
        else {
        api.sendMessage(`Bạn đã đi khách và nhận được số tiền là ${amount} LE`, threadID, async () => {
            await Currencies.increaseMoney(event.senderID, parseInt(amount));
            await Currencies.setData(event.senderID, { slutTime: Date.now() });
        }, messageID);
        }
    }
}
