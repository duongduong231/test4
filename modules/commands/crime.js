module.exports.config = {
	name: "crime",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: ":EVIL:",
	commandCategory: "Economy",
	usages: "crime",
  cooldowns: 5,
  dependencies: ["fs-extra"],
  envConfig: {
       cooldownTime: 1200000
  }
};

module.exports.run = async ({ event, api, Currencies, __GLOBAL }) => {
    const { readFile,readFileSync, createReadStream, createWriteStream, unlinkSync } = require("fs-extra");
    //const ms = require("parse-ms");
   
    const { threadID, messageID } = event;
    const cooldown = __GLOBAL.crime.cooldownTime;
    const data = (await Currencies.getData(event.senderID)).crimeTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
        var time = cooldown - (Date.now() - data),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);     

    return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, event.threadID, event.messageID);
  }    
  else {
        let amount = Math.floor(Math.random() * 1000) - 500;
        if (amount < 0) {
        return readFile(__dirname + "/cache/crime.json", (err, data) => {
               var fail = JSON.parse(data).fail
               api.sendMessage(`Bạn đã ${fail[Math.floor(Math.random() * fail.length)]} nên mất ${amount} LE`, threadID, async () => {
                    await Currencies.increaseMoney(event.senderID, parseInt(amount));
                    await Currencies.setData(event.senderID, { crimeTime: Date.now() });
            },messageID)
        })
        }
        if (amount == 0) {
            return api.sendMessage(`Bạn nhận ra mình lười vãi ò nên đã ở nhà và không nhận được xu nào`, threadID, async () =>                     							
             await Currencies.setData(event.senderID, { crimeTime: Date.now() }), messageID);
        }
        else {
        return readFile(__dirname + "/cache/crime.json", (err, data) => {
                var success = JSON.parse(data).success
                api.sendMessage(`Bạn đã ${success[Math.floor(Math.random() * success.length)]} nên nhận được ${amount} LE`, threadID, async () => {
                    await Currencies.increaseMoney(event.senderID, parseInt(amount));
                    await Currencies.setData(event.senderID, { crimeTime: Date.now() });
            },messageID)
        })
    }    
}
  }