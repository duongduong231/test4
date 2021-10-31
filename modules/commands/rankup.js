module.exports.config = {
	name: "rankup",
	version: "0.0.1-beta",
	hasPermssion: 1,
	credits: "CatalizCS",
	description: "Thông báo rankup cho từng nhóm, người dùng",
	commandCategory: "system",
	usages: "rankup",
	dependencies: ["fs-extra"],
	cooldowns: 5,
	envConfig: {
		unsendMessageAfter: 5
	}
};

module.exports.event = async function({ api, event, Currencies, Users, client }) {
	const {threadID, senderID, isGroup } = event;
	const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
  if (!isGroup) return;
	const threadData = client.threadSetting.get(threadID) || {};
  
	var exp = parseInt((await Currencies.getData(`${senderID !== api.getCurrentUserID() ? senderID : ``}`)).exp);
	exp = exp += 1;
	//if (!threadData["rankup"] == true) return;

	if (isNaN(exp)) return;
  if (client.inProcess == true) return;
  if (threadData["rankup"] == false) return	await Currencies.setData(senderID, { exp });


	const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
	const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

	if (level > curLevel && level != 1) {
    var title = ["Trình độ chém gió","Độ lẻo mép","Cơ hàm","Mồm","Trình độ bán cá","Trình độ bắn Rap","Trình buôn dưa lê","Trình tám chuyện"]
		const nameUser = (await Users.getData(senderID)).name || (await Users.getInfo(senderID)).name;
		var messsage = (typeof threadData.customRankup == "undefined") ? msg = `${title[Math.floor(Math.random() * title.length)]}` + " của {name} đã đạt tới level {level}" : msg = threadData.customRankup,
			arrayContent;

		messsage = messsage
			.replace(/\{name}/g, nameUser)
			.replace(/\{level}/g, level);
			
		if (existsSync(__dirname + "/cache/rankup/")) mkdirSync(__dirname + "/cache/rankup/", { recursive: true });
		if (existsSync(__dirname + `/cache/rankup/${event.threadID}.gif`)) arrayContent = { body: messsage, attachment: createReadStream(__dirname + `/cache/rankup/${event.threadID}.gif`), mentions: [{ tag: nameUser, id: senderID }] };
		else arrayContent = { body: messsage, mentions: [{ tag: nameUser, id: senderID }] };
		api.sendMessage(arrayContent, threadID);
	}

	await Currencies.setData(senderID, { exp });
	return;
}
module.exports.run = async function({ api, event, Threads, client }) {
	let settings = (await Threads.getData(event.threadID)).settings;
  if (settings["rankup"] == false) settings["rankup"] = true;
	else settings["rankup"] = false;
	
	await Threads.setData(event.threadID, options = { settings });
	client.threadSetting.set(event.threadID, settings);
	
	return api.sendMessage(`Đã ${(settings["rankup"] == true) ? "bật" : "tắt"} thành công thông báo rankup!`, event.threadID);
}