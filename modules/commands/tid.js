module.exports.config = {
  name: "tid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "Lấy threadID",
  commandCategory: "System",
  usages: "tid",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
api.sendMessage(`${event.threadID}`,event.threadID)
}
