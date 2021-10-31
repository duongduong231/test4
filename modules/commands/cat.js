module.exports.config = {
	name: "cat",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh mèo",
	commandCategory: "random-img",
	usages: "cat",
	cooldowns: 5,
	dependencies: ['request', 'fs-extra','axios']
};

module.exports.run = ({ event, api }) => {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const request = require("request");
    const axios = require("axios");
	  const fs = require("fs-extra");
  
        return  axios.get("https://aws.random.cat/meow").then(res => {
				let ext = res.data.file.substring(res.data.file.lastIndexOf(".") + 1);
				let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/meow.${ext}`)
					}, event.threadID);
				};
        request(res.data.file).pipe(createWriteStream(__dirname + `/cache/meow.${ext}`)).on("close", () =>api.sendMessage({attachment: createReadStream(__dirname + `/cache/meow.${ext}`)}, event.threadID, () => unlinkSync(__dirname + `/cache/meow.${ext}`), event.messageID));
			})
}
                                                                 