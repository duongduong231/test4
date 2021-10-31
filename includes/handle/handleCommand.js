module.exports = function({ api, __GLOBAL, client, models, Users, Threads, Currencies, utils }) {
const stringSimilarity = require('string-similarity');
	const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const logger = require("../../utils/log.js");
  const path = require("path");
	return async function({ event }) {
		const dateNow = Date.now();
		const {  body: contentMessage, senderID, threadID, messageID } = event;
   // const find = threadInfo.adminIDs.find(el => el.id == senderID);
    const allow = __GLOBAL.settings.allow.find(a => a == event.threadID)
    const admin = __GLOBAL.settings.ADMINBOT.find(a => a == senderID)    
    if (client.userBanned.has(senderID.toString()) || __GLOBAL.settings.allowInbox == false && senderID == threadID || !allow && !admin) return;
    if (client.threadBanned.has(threadID.toString()) ) return api.removeUserFromGroup(api.getCurrentUserID(),event.threadID);
    //var threadSetting = client.threadSetting.get(parseInt(threadID)) || {}
    var threadSetting = client.threadSetting.get(threadID) || {};
		var prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : __GLOBAL.settings.PREFIX )})\\s*`);
		if (!prefixRegex.test(contentMessage)) return;
    const fs = require("fs-extra");
    /*
    var nocmdData = JSON.parse(fs.readFileSync("././modules/commands/cache/cmds.json"));

    var cmds = nocmdData.banned.find(item => item.id == threadID).cmds;
    for (const item of cmds)
      if (contentMessage.indexOf((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : __GLOBAL.settings.PREFIX + item) == 0) return api.sendMessage("Lệnh này đã bị cấm!", threadID, messageID);

    */
		//////////////////////////////////////////
		//=========Get command user use=========//
		//////////////////////////////////////////

		const [matchedPrefix] = contentMessage.match(prefixRegex);
		const args = contentMessage.slice(matchedPrefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		const commandBanned = client.commandBanned.get(senderID) || [];
		if (commandBanned.includes(commandName)) return;
		var command = client.commands.get(commandName);
    var jsonData = JSON.parse(fs.readFileSync(__dirname + "/../../modules/commands/cache/cmds.json"));

    if (!jsonData.banned.some(item => item.id == event.threadID)) {
      let addThread = {
        id: event.threadID,
        cmds: []
      };
      jsonData.banned.push(addThread);
      fs.writeFileSync(__dirname + "/../../modules/commands/cache/cmds.json", JSON.stringify(jsonData));
    }    
    var getCMDS = jsonData.banned.find(item => item.id == event.threadID).cmds;
    if (getCMDS.find(a => a == commandName)) return api.sendMessage("Lệnh " + commandName + " đã bị cấm ở nhóm này",event.threadID,event.messageID);

		if (!command) {
			var allCommandName = [];
			const commandValues = client.commands.values();
			for (const cmd of commandValues) allCommandName.push(cmd.config.name);
			const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
			if (checker.bestMatch.rating >= 0.5) command = client.commands.get(checker.bestMatch.target);
			else return; //api.sendMessage(`Lệnh bạn sử dụng không tồn tại, có phải là lệnh "${checker.bestMatch.target}" hay không?`, threadID);
		}

		////////////////////////////////////////
		//========= Check threadInfo =========//
		////////////////////////////////////////
		
		var threadInfo = (client.threadInfo.get(threadID) || await Threads.getInfo(threadID));
		if(Object.keys(threadInfo).length == 0) {
			try {
				threadInfo = await api.getThreadInfo(event.threadID);
				await Threads.setData(threadID, { name: threadInfo.name, threadInfo });
				client.threadInfo.set(threadID.toString(), threadInfo);
			}
			catch {
				logger("Không thể lấy thông tin của nhóm!", "error");
			}
		}

		////////////////////////////////////////
		//========= Check permssion =========//
		///////////////////////////////////////
/*
		var permssion = 0;
		if (command.config.hasPermssion == 2 && !__GLOBAL.settings.ADMINBOT.includes(senderID)) return api.sendMessage(`🍐 Bạn không đủ quyền hạn người điều hành bot đề sử dụng lệnh ${command.config.name}`, threadID, messageID);
		else permssion = 2;
		const find = threadInfo.adminIDs.find(el => el.id == senderID);
		if (command.config.hasPermssion == 1 && !__GLOBAL.settings.ADMINBOT.includes(senderID) && !find) return api.sendMessage(`🍐 Bạn không đủ quyền hạn quản trị viên đề sử dụng lệnh ${command.config.name}`, threadID, messageID);
		else permssion = 1;
*/
    var permssion = 0;
		
    const find = threadInfo.adminIDs.find(el => el.id == senderID);
		
		if (__GLOBAL.settings.ADMINBOT.includes(senderID)) permssion = 2;
		else if (!__GLOBAL.settings.ADMINBOT.includes(senderID) && find) permssion = 1;

    if (command.config.hasPermssion > permssion) return api.sendMessage(`Bạn không đủ quyền hạn để có thể sử dụng lệnh "${command.config.name}"`, event.threadID, event.messageID);
    ////////////////////////////////////
    let settings = (await Threads.getData(event.threadID)).settings;  
     if (typeof settings["status"] == "undefined") {
       settings["status"] = true
       await Threads.setData(event.threadID, options = { settings });
	    client.threadSetting.set(event.threadID, settings);
     }	
     if (settings["status"] == false) {
      let info = await api.getThreadInfo(event.threadID);
      let ad = info.adminIDs.find(el => el.id == senderID);
      if (!__GLOBAL.settings.ADMINBOT.includes(senderID) && !ad)return api.sendMessage(`Bot đang tắt, QTV sử dụng [/bot] để bật`, event.threadID, event.messageID);
     }     
    
    ////////////////////////////////////
    //var bans = JSON.parse(fs.readFileSync(__dirname + `/cache/bans.json`)); 
    //if(bans.banned[threadID].includes(senderID) && permssion == 0) return api.removeUserFromGroup(parseInt(senderID), threadID)

    
		////////////////////////////////////
		//=========Check cooldown=========//
		////////////////////////////////////

		if (!client.cooldowns.has(command.config.name)) client.cooldowns.set(command.config.name, new Map());
		const timestamps = client.cooldowns.get(command.config.name);
		const cooldownAmount = (command.config.cooldowns || 1) * 1000;
		if (timestamps.has(senderID)) {
			const expirationTime = timestamps.get(senderID) + cooldownAmount;
			if (dateNow < expirationTime) return api.setMessageReaction('⏱', event.messageID, (err) => (err) ? logger('Đã có lỗi xảy ra khi thực thi setMessageReaction', 2) : '', true);
		}

		///////////////////////////////////
		//========= Run command =========//
		///////////////////////////////////

		try {
			command.run({ api, __GLOBAL, client, event, args, models, Users, Threads, Currencies, utils, permssion });
			timestamps.set(senderID, dateNow);
			
			if (__GLOBAL.settings.DeveloperMode == true) {
				const moment = require("moment-timezone");
				const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
				logger(`[ ${time} ] Command Executed: ${commandName} | User: ${senderID} | Arguments: ${args.join(" ")} | Group: ${threadID} | Process Time: ${(Date.now()) - dateNow}ms`, "[ DEV MODE ]");
			}
			return;
		}
		catch (error) {
			logger(error + " tại lệnh: " + command.config.name, "error");
			return api.sendMessage("Đã có lỗi xảy ra khi thực khi lệnh đó. Lỗi: " + error, threadID);
		}
	}
}