module.exports.config = {
	name: "dog",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random ảnh chó",
	commandCategory: "random-img",
	usages: "dog",
	cooldowns: 5,
	dependencies: ['request', 'fs-extra','axios']
};

module.exports.run = ({ event, api }) => {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const request = require("request");
    const axios = require("axios");
	  const fs = require("fs-extra");
  
        return  axios.get("https://some-random-api.ml/img/dog").then(res => {
				let ext = res.data.link.substring(res.data.link.lastIndexOf(".") + 1);
				let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/dog.${ext}`)
					}, event.threadID);
				};
        request(res.data.link).pipe(createWriteStream(__dirname + `/cache/dog.${ext}`)).on("close", () =>api.sendMessage({attachment: createReadStream(__dirname + `/cache/dog.${ext}`)}, event.threadID, () => unlinkSync(__dirname + `/cache/dog.${ext}`), event.messageID));
			})
}
                                                                 