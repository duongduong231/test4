module.exports.config = {
	name: "restart",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "",
	commandCategory: "system",
	usages: "",
	cooldowns: 500
};

module.exports.run = async ({ event, api, Threads, client }) => {
  const cmd = require('node-cmd');
cmd.run(process.exit());
}