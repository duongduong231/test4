module.exports.config = {
	name: "lyrics",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Lấy lời 1 bài hát",
	commandCategory: "Media",
	usages: "lyrics",
	cooldowns: 10,
	dependencies: ['axios'],
  info: [
    		{
			key: "Server",
			prompt: "Server lấy lyrics",
			type: 'Văn bản',
			example: 'sv1/sv2'
		},
		{
			key: "Text",
			prompt: "1 tên bài hát bạn muốn lấy lời",
			type: 'Văn bản',
			example: 'Có chắc yêu là đây'
		}
	]
};

module.exports.run = async function({ api, event, args }) {
  const start = Date.now();
  const axios = require("axios");
  if (args[0] == "sv1"){
    	let res = await	axios.get(encodeURI(`https://le31.glitch.me/lyrics-nct?q=${encodeURIComponent(args.join(" ").slice(3))}`).replace("%20",""))
    api.sendMessage(`${res.data.name}\n\n${res.data.lyrics}`, event.threadID);
   // api.sendMessage(`Ping: ${Date.now() - start} ms`, event.threadID);
  }
    else if (args[0] == "sv2"){
    	let res = await	axios.get(encodeURI(`https://le31.glitch.me/lyrics-csn?q=${encodeURIComponent(args.join(" ").slice(3))}`).replace("%20",""))
    api.sendMessage(`${res.data.name}\n\n${res.data.lyrics}`, event.threadID);
   // api.sendMessage(`Ping: ${Date.now() - start} ms`, event.threadID);
  }
  else return api.sendMessage(`Cần chọn server lấy lyrics [sv1/sv2]`, event.threadID);
}
                                                                 