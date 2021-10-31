module.exports.config = {
	name: "zalgo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Banledangyeuu",
	description: "Zalgo text",
  commandCategory: "cipher",
  dependencies: ["to-zalgo"],
	usages: "zalgo [text]",
	cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
  const Zalgo = require("to-zalgo");
  return api.sendMessage(Zalgo(args.join(" ")), event.threadID, event.messageID);
}