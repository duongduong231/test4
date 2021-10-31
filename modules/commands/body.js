module.exports.config = {
	name: "body",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh body",
	commandCategory: "random-img",
	usages: "body",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
}; 

module.exports.run = async function({ event, api, Currencies }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
	  const fs = require("fs-extra");
    const moneydb = (await Currencies.getData(event.senderID)).money;
    if(moneydb < 600) return api.sendMessage("Bạn cần 600 LE để thực hiện lệnh",event.threadID, event.mesageID);
   
    let body = (await axios.get( `https://le31.glitch.me/image/download/body&key=danglehoang`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/body.png", Buffer.from(body, "utf-8") );
    api.sendMessage({body:"-600 LE", attachment: fs.createReadStream(__dirname + `/cache/body.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/body.png`) + Currencies.decreaseMoney(event.senderID, 600), event.messageID );
}
                                                                 