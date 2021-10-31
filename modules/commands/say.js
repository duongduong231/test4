module.exports.config = {
	name: "say",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Khiến bot trả về file âm thanh của chị google thông qua văn bản",
	commandCategory: "media",
	usages: "[ru/en/ko/ja] [Text]",
	cooldowns: 5,
	dependencies: ["path","fs-extra"]
};

module.exports.run = async function({ api, event, args, __GLOBAL,downloadFile }) {
	try {
    const axios = require("axios")
    const fs = require("fs-extra");
		let { createReadStream, unlinkSync } = require("fs-extra");
    let { resolve } = require("path");
    const { createWriteStream } = require('fs');
	  var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
		var languageToSay = (["ru","en","ko","ja"].some(item => content.indexOf(item) == 0)) ? content.slice(0, content.indexOf(" ")) : 'vi';
		var msg = (languageToSay != 'vi') ? content.slice(3, content.length) : content;
		const path = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
 
    let say = (await axios.get( `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( path, Buffer.from(say, "utf-8"));
   
    //await axios.get(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, { responseType: "arraybuffer", path });
		return api.sendMessage({ attachment: createReadStream(path)}, event.threadID, () => unlinkSync(path));
	} catch (e) { return console.log(e) };
}