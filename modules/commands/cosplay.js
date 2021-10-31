module.exports.config = {
	name: "cosplay",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh cosplay",
	commandCategory: "random-img",
	usages: "cosplay",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.run = async function({ event, api }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
	const fs = require("fs-extra");
    
    let cosplay = (await axios.get( `https://api.meewmeew.ml/image/cosplay`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/cosplay.png", Buffer.from(cosplay, "utf-8") );
    api.sendMessage({ attachment: fs.createReadStream(__dirname + `/cache/cosplay.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/cosplay.png`), event.messageID );
}
                                                                 