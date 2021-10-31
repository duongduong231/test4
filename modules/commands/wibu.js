module.exports.config = {
	name: "wibu",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh wibu",
	commandCategory: "random-img",
	usages: "wibu",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.run = async function({ event, api, Currencies }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
	  const fs = require("fs-extra");
    const moneydb = (await Currencies.getData(event.senderID)).money;

    if(moneydb < 60) return api.sendMessage("Bạn cần 60 LE để thực hiện lệnh",event.threadID, event.mesageID);
    let wibu = (await axios.get( `https://le31.glitch.me/image/download/wibu&key=danglehoang`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/wibu.png", Buffer.from(wibu, "utf-8") );
    api.sendMessage({body:"-60 LE", attachment: fs.createReadStream(__dirname + `/cache/wibu.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/wibu.png`) + Currencies.decreaseMoney(event.senderID, 60), event.messageID );
}
                                                                 