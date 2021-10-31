module.exports = function({ __GLOBAL, api, Users, Threads, Currencies, client }) {
	const logger = require("../../utils/log.js");
	return async function({ event }) {
		try {
      const allow = __GLOBAL.settings.allow.find(a => a == event.threadID)
			if (__GLOBAL.settings.autoCreateDB == false || client.inProcess == true) return
			const { senderID, threadID, isGroup } = event;
			if (!isGroup) return;
			var settings = {};

			if (!client.allThread.includes(parseInt(threadID)) && event.isGroup == true) {
				try {	
          api.muteThread(event.threadID, -1);
					client.inProcess = true;
					await Threads.createData(threadID, { settings });
					client.allThread.push(parseInt(threadID));
					logger(`New Thread: ${threadID}`, "[ DATABASE ]")
					client.inProcess = false;
				}
				catch {
					client.inProcess = false;
					logger("Không thể ghi nhóm có ID " + threadID + " vào database!", "[ DATABASE ]");
				}
			}

			if (!client.allUser.includes(parseInt(senderID))) {
				try {
					client.inProcess = true;
					const name = (await api.getUserInfo(senderID))[senderID].name;
					const gender = (await api.getUserInfo(senderID))[senderID].gender;
					await Users.createData(senderID, { name, gender });
					logger(`New User: ${senderID}`, "[ DATABASE ]")
					await Currencies.createData(senderID, { name });
					client.allUser.push(parseInt(senderID));
					logger(`New Currency: ${senderID}`, "[ DATABASE ]")
					client.inProcess = false;
				}
				catch {
					client.inProcess = false;
					logger("Không thể ghi người dùng có ID " + senderID + " vào database!", "[ DATABASE ]");
				}
			}
			return;
		}
		catch(e) {
			console.log(e);
		}
	}
}