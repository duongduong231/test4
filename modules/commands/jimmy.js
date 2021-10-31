module.exports.config = {
	name: "jimmy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh jimmy",
	commandCategory: "random-img",
	usages: "jimmy",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.run = async function({ event, api, Currencies }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
    const fs = require("fs-extra");
    const moneydb = (await Currencies.getData(event.senderID)).money;

    if(moneydb < 60) return api.sendMessage("Bạn cần 60 LE để thực hiện lệnh",event.threadID, event.mesageID);
    let jimmy = (await axios.get( `https://le31.glitch.me/image/download/jimmy&key=danglehoang`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/jimmy.png", Buffer.from(jimmy, "utf-8") );
    api.sendMessage({body:"-60 LE", attachment: fs.createReadStream(__dirname + `/cache/jimmy.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/jimmy.png`) + Currencies.decreaseMoney(event.senderID, 60), event.messageID );
}
                                                                 