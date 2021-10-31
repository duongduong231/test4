module.exports.config = {
	name: "parrots",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh parrots",
	commandCategory: "random-img",
	usages: "parrots",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.run = async function({ event, api, args, Currencies }) {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const axios = require("axios");
	  const fs = require("fs-extra");
    const moneydb = (await Currencies.getData(event.senderID)).money;
    if(moneydb < 50) return api.sendMessage("Bạn cần 60 LE để thực hiện lệnh",event.threadID, event.mesageID);
    if (args[0].toLowerCase() == "moments") {   
      let moments = (await axios.get( `https://le31.glitch.me/image/download/parrots/moments`, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/moments.png", Buffer.from(moments, "utf-8") );
      api.sendMessage({body:"-60 LE", attachment: fs.createReadStream(__dirname + `/cache/moments.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/moments.png`) + Currencies.decreaseMoney(event.senderID, 60), event.messageID );
    }
    else if (args[0].toLowerCase() == "flags") {   
      let flags = (await axios.get( `https://le31.glitch.me/image/download/parrots/flags`, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/flags.png", Buffer.from(flags, "utf-8") );
      api.sendMessage({body:"-60 LE", attachment: fs.createReadStream(__dirname + `/cache/flags.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/flags.png`) + Currencies.decreaseMoney(event.senderID, 60), event.messageID );
    }
    else return api.sendMessage(`FLAGS or MOMENTS?`,event.threadID, event.mesageID);
}
                                                                 