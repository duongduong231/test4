module.exports.config = {
	name: "tattoo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh tattoo",
	commandCategory: "random-img",
	usages: "tattoo",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.run = async function({ event, api, Currencies }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
	  const fs = require("fs-extra");
    const moneydb = (await Currencies.getData(event.senderID)).money;
    if(moneydb < 60) return api.sendMessage("Bạn cần 60 LE để thực hiện lệnh",event.threadID, event.mesageID);
   
    let tattoo = (await axios.get( `https://le31.glitch.me/image/download/tattoo&key=danglehoang`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/tattoo.png", Buffer.from(tattoo, "utf-8") );
    api.sendMessage({body:"-60 LE", attachment: fs.createReadStream(__dirname + `/cache/tattoo.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/tattoo.png`) + Currencies.decreaseMoney(event.senderID, 60), event.messageID );
}
                                                                 