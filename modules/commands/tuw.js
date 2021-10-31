module.exports.config = {
	name: "tuw",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "random 1 trang web vô dụng cho bạn",
	commandCategory: "General",
	usages: "tuw",
	cooldowns: 10,
	dependencies: ["axios"]
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/theuselessweb`))
  return api.sendMessage(`the useless webside: ${(res.data.data)}`, event.threadID);
}
