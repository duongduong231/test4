 module.exports.config = {
	name: "teach",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Dạy bot (dùng cho lệnh sim)",
	commandCategory: "chatbot",
	usages: "teach [In] => [Out]",
	cooldowns: 5,
	dependencies: ["axios"],
	info: [
		{ 
			key: 'In',
			prompt: 'Câu đầu vào',
			type: 'Văn Bản',
			example: 'Chào SpermLord'
		},
		{
			key: 'Out',
			prompt: 'Câu đầu ra',
			type: 'Văn Bản',
			example: 'Chào cái baise ta mère'
		}
	]
}; 

module.exports.run = async function({ api, event, args }) {
	const axios = require("axios");
  let sim = (await axios.get(encodeURI(`https://le31.glitch.me/le/teach?q=`+ args.join(" ")))).data;
  return api.sendMessage(`${sim.data}`, event.threadID, event.messageID)
}
