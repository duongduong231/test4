

module.exports = function({ api, __GLOBAL, client, models, Users, Threads, Currencies }) {
	const logger = require("../../utils/log.js");
	return async function({ event }) {
		const timeStart = Date.now();
		var { senderID, threadID } = event;
		senderID = parseInt(senderID);
		threadID = parseInt(threadID);
  /*  ////////////////////////////////////
		var threadInfo = (client.threadInfo.get(threadID) || await Threads.getInfo(threadID));
    var permssion = 0;
    const find = threadInfo.adminIDs.find(el => el.id == senderID);
		if (__GLOBAL.settings.ADMINBOT.includes(senderID)) permssion = 2;
		else if (!__GLOBAL.settings.ADMINBOT.includes(senderID) && find) permssion = 1;
    ////////////////////////////////////
    let settings = (await Threads.getData(event.threadID)).settings;  
    if (settings["status"] == false && permssion == 0 || typeof settings["status"] == undefined && permssion == 0) return;
		////////////////////////////////////
		
    */
    const allow = __GLOBAL.settings.allow.find(a => a == event.threadID)
    if (client.userBanned.has(senderID) || client.threadBanned.has(threadID) || __GLOBAL.settings.allowInbox == false && senderID == threadID|| !allow) return;  
    for (const [key, value] of client.events.entries()) {
			if (value.config.eventType.indexOf(event.logMessageType) !== -1) {
				const eventRun = client.events.get(key);
				try {
					await eventRun.run({ api,event, __GLOBAL, client, models, Users, Threads, Currencies });
					if (__GLOBAL.settings.DeveloperMode == true) {
						const moment = require("moment");
						const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
						logger(`[ ${time} ] Event Executed: ${eventRun.config.name} | Group: ${threadID} | Process Time: ${(Date.now()) - timeStart}ms`, "[ DEV MODE ]");
					}
				}
				catch (error) {
					logger(JSON.stringify(error) + " at event: " + eventRun.config.name , "error");
				}
			};
		}
		return;
	}
}