module.exports.config = {
	name: "horror",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh horror",
	commandCategory: "random-img",
	usages: "horror",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.run = async function({ event, api, Currencies }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
	  const fs = require("fs-extra");
    const moneydb = (await Currencies.getData(event.senderID)).money;

    if(moneydb < 60) return api.sendMessage("Bạn cần 60 LE để thực hiện lệnh",event.threadID, event.mesageID);
    let horror = (await axios.get( `https://le31.glitch.me/image/download/horror&key=danglehoang`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/horror.png", Buffer.from(horror, "utf-8") );
    api.sendMessage({body:"-60 LE", attachment: fs.createReadStream(__dirname + `/cache/horror.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/horror.png`) + Currencies.decreaseMoney(event.senderID, 60), event.messageID );
}
                                                                 