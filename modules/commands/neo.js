module.exports.config = {
	name: "neo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Đếm số lượng vật thể gần trái đất",
	commandCategory: "General",
	usages: "neo",
	cooldowns: 5,
	dependencies: ['request']
};

module.exports.run = ({ event, api }) => {
  const request = require('request');
  
	return request(`https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY`, (err, response, body) => {
				if (err) throw err;
				var jsonData = JSON.parse(body);
				api.sendMessage(`Hiện tại đang có tổng cộng: ${jsonData.element_count} vật thể đang ở gần trái đất ngay lúc này!`, event.threadID, event.messageID);
			});
}
