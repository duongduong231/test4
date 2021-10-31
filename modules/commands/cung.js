module.exports.config = {
	name: "cung",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Xem thông tin cung hoàng đạo",
	commandCategory: "Other",
	usages: "cung [Text]",
	cooldowns: 10,
	dependencies: ["axios"],
	info: [
		{
			key: "Text",
			prompt: "1 cung hoàng đạo",
			type: 'Văn bản',
			example: 'song tử'
		}
	]
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require("axios");
  if (!args.join(" ")) return api.sendMessage("Bạn chưa nhập tin nhắn",event.threadID);
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/cung?q=${args.join(" ")}`))
  return api.sendMessage(`${(res.data.data).join("")}`, event.threadID);
}
