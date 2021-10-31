 module.exports.config = {
	name: "tod",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Chơi trò truth or dare",
	commandCategory: "game-sp",
	usages: "tod [choose] [key]",
	cooldowns: 5,
	dependencies: ["axios"],
	info: [
		{
			key: 'choose',
			prompt: 'truth để đưa câu hỏi hoặc dare để đưa 1 lời thách thức',
			type: 'Văn Bản',
			example: 'truth'
		},
        {
			key: 'key',
			prompt: 'rỗng để random câu hỏi hoặc add + [câu hỏi hoặc lời thách thức] để thêm câu hỏi hoặc thách thức',
			type: 'Văn Bản',
			example: 'add Thách m nhắn tên mình kèm chữ ngu 10 lần'
		}
	]
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    var tod = args[1];
    var choose = args[0];
    if (!tod) {
        if (choose == "truth") {
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/truthordare/truth/play`))
  	return api.sendMessage(`${res.data.data}`, event.threadID);
        }
        if (choose == "dare") {
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/truthordare/dare/play`))
  	return api.sendMessage(`${res.data.data}`, event.threadID);
        }
    else return api.sendMessage(`Sai format`, event.threadID);
    }
	if (tod == "add") {
    if (choose == "truth") {
    var ask = args.join(" ").slice(10);
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/truthordare/truth/request?q=${ask}`))
  	return api.sendMessage(`${res.data.data}`, event.threadID);
    }
    if (choose == "dare") {
    var ask = args.join(" ").slice(9);
	let res = await	axios.get(encodeURI(`https://le31.glitch.me/truthordare/dare/request?q=${ask}`))
  	return api.sendMessage(`${res.data.data}`, event.threadID);
    }
    else return api.sendMessage(`Sai format`, event.threadID);
}
    else return api.sendMessage(`Sai format`, event.threadID);    
}