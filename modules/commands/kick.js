module.exports.config = {
	name: "kick",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Thọ",
	description: "Xoá người bạn cần xoá khỏi nhóm bằng cách tag",
	commandCategory: "other", 
	usages: "kick [tag]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run =async function({ api, event, Threads }) {
	var mention = Object.keys(event.mentions);
		var threadInfo = await api.getThreadInfo(event.threadID);
    const find = threadInfo.adminIDs.find(el => el.id == event.senderID && api.getCurrentUserID());
    if (!find) return api.sendMessage(`Bạn và bot cần là quản trị viên!`,event.threadID);
		if(!mention[0]) return api.sendMessage("Bạn phải tag người cần kick",event.threadID);
			for (let o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o],event.threadID) 
				},2000)
			}
}