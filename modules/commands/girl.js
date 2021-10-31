module.exports.config = {
	name: "girl",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh gái",
	commandCategory: "random-img",
	usages: "girl",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.run = async function({ event, api, Currencies }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
    const fs = require("fs-extra");
    const moneydb = (await Currencies.getData(event.senderID)).money;
    if(moneydb < 60) return api.sendMessage("Bạn cần 60 LE để thực hiện lệnh",event.threadID, event.mesageID);
 
    let girl = (await axios.get( `https://le31.glitch.me/image/download/girl&key=danglehoang`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/girl.png", Buffer.from(girl, "utf-8"));
    api.sendMessage({body:"-60 LE", attachment: fs.createReadStream(__dirname + `/cache/girl.png`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/girl.png`) + Currencies.decreaseMoney(event.senderID, 60), event.messageID );
}
                                                                 