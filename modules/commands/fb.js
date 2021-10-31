module.exports.config = {
	name: "fb",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "MewMew",
	description: "Lấy link tải video facebook",
	commandCategory: "media",
	usages: "fb [url]",
	cooldowns: 5,
  info: [
		{
			key: "url",
			prompt: "url video",
			type: 'Văn bản',
			example: 'https://www.facebook.com/marktwooo/videos/769195206993638'
		}
	]
};

module.exports.run = async function({ event, api, args }) {
    var {threadID, messageID} = event;
    const https = require("https");
    const request = require("request");
    const axios = require("axios");
	const fs = require("fs-extra");
    const start = Date.now();

    var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err))))
    return axios.get(args.join("")).then(res => {
    const link = res.data.split('hd_src:"')[1].split('",sd_src:"')[0];
    var callback = () => {
        short(link).then(linkvideo => api.sendMessage({body:`link download: ${linkvideo}`,attachment: fs.createReadStream(__dirname + "/cache/fb.mp4")}, threadID, () => {
        api.sendMessage(`Ping: ${Date.now() - start} ms`, event.threadID);
        fs.unlinkSync(__dirname + "/cache/fb.mp4")
        }
        ));     
	}
    request(link).pipe(fs.createWriteStream(__dirname +'/cache/fb.mp4', {flags: 'w'})).on('close', () => callback());   
    })
}
                                         
                                         