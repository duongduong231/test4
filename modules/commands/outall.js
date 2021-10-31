module.exports.config = {
	name: "outall",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "banledangyeuu",
	description: "",
	commandCategory: "admin",
	usages: "outall",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args, client }) => {
	var allThread = client.allThread || [];
	var count = 1;
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.removeUserFromGroup(api.getCurrentUserID(), idThread)
			count++;
			await new Promise(resolve => setTimeout(resolve, 600));
		}
	}
	return api.sendMessage(`Da roi khoi ${count} nhóm!`, event.threadID, event.messageID);
}