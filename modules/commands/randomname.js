module.exports.config = {
	name: "rname",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Random biệt danh cho bạn",
	commandCategory: "group",
	usages: "rname",
	cooldowns: 5,
	dependencies: ["axios"],
  	info: [
		{
			key: "Text",
			prompt: "1 tag nước mà bạn muốn đổi tên, xem tag dùng /rname",
			type: 'Văn bản',
			example: 'vietnam'
		}
	]
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require("axios");
  if (!args.join(" ")) {
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/randomname`))
   return api.sendMessage(`sử dụng /rname + [tag: ${(res.data.country)}] để đổi nickname ngẫu nhiên theo tên nước`, event.threadID);
  }
                                                                                                   
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/randomname/${args.join(" ")}`))
  api.changeNickname(`${res.data.name}`, event.threadID, event.senderID);
}