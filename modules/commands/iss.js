module.exports.config = {
	name: "iss",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Xem toạ độ mà tàu vũ trụ đang lưu lạc",
	commandCategory: "General",
	usages: "iss",
	cooldowns: 5,
	dependencies: ['request']
};

module.exports.run = ({ event, api }) => {
  const request = require('request');
  
			return request(`http://api.open-notify.org/iss-now.json`, (err, response, body) => {
				if (err) throw err;
				var jsonData = JSON.parse(body);
				api.sendMessage(`Vị trí hiện tại của International Space Station 🌌🌠🌃\nVĩ độ: ${jsonData.iss_position.latitude} | Kinh độ: ${jsonData.iss_position.longitude}`, event.threadID, event.messageID);
			});
}
