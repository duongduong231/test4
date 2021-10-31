module.exports.config = {
	name: "warnNban",
	eventType: ["log:subscribe"],
	version: "1.0.0",
	credits: "Banledangyeuu",
	description: "Listen events",
	dependencies: ["request", "fs-extra"]
};
/*

module.exports.run = async function({ api, event, client }) {
	if (event.logMessageType == 'log:subscribe') {
		const fs = require('fs-extra');
		let { threadID, messageID } = event;

		if (!fs.existsSync(__dirname + `/../commands/cache/bans.json`)) return;
		var ban = JSON.parse(fs.readFileSync(__dirname + `/../commands/cache/bans.json`));
		var listban = ban.banned[threadID];
		const allUserThread = (await api.getThreadInfo(event.threadID)).participantIDs;

		for (let info of allUserThread) {
			if (listban.includes(parseInt(info))) {
				api.removeUserFromGroup(parseInt(info), threadID, e => {
					if (e) return api.sendMessage(e, threadID);
					api.sendMessage(`[${info}] không thể tham gia nhóm vì đã bị ban từ trước`,threadID);
				});
			}
		}
	}
};*/

module.exports.run = async function({ api, event }) {
  const { messageID, threadID, senderID } = event;
	const fs = require("fs-extra");
  if (!fs.existsSync(__dirname + `/../commands/cache/bans.json`)) return;
  const threadInfo = await api.getThreadInfo(threadID);
  if (!threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID())) return;
	const bans = JSON.parse(fs.readFileSync(__dirname + `/../commands/cache/bans.json`));
  
  //for (var i = 0; i < event.logMessageData.addedParticipants.length; i++) {
  let ids = [], nameArray = [], mentions= [];
		for (let i of event.logMessageData.addedParticipants) {
			let id = i.userFbId;
      let a = JSON.stringify(bans.banned)
			//let userName = event.logMessageData.addedParticipants[i].fullName;
      if(a.includes(id)) api.removeUserFromGroup(id, threadID);

        //nameArray.push(userName);
			  //mentions.push({ tag: userName, id });
    }  //}
  //return api.sendMessage({body: `Đã kick thành viên ${nameArray.join(", ")} vì bị ban từ trước`, mentions: mentions}, threadID, messageID);
}