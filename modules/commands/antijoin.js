module.exports.config = {
  name: "antijoin",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "banledangyeuu",
  description: "Bật tắt tính năng cấm thành viên vào nhóm",
  commandCategory: "group (QTV)",
  usages: "antijoin [on/off]",
  cooldowns: 1
};

module.exports.run = async ({ event, api, args, Threads, client, utils }) => {
  let settings = (await Threads.getData(event.threadID)).settings;
	if (settings["antiJoin"] == false ||typeof settings["antiJoin"] == "undefined") settings["antiJoin"] = true;
	else settings["antiJoin"] = false;
	
	await Threads.setData(event.threadID, options = { settings });
	client.threadSetting.set(event.threadID, settings);
	
	return api.sendMessage(`Đã ${(settings["antiJoin"] == true) ? "bật" : "tắt"} thành công ANTIJOIN!`, event.threadID);
  /*    switch (args[0]) {
        case "on": {
            settings["antiOut"] = true;
            await Threads.setData(event.threadID, options = { settings });
            client.threadSetting.set(event.threadID, settings);
            api.sendMessage("Đã bật antiOut!", event.threadID);
            break;
        }
        case "off": {
            settings["antiOut"] = false;
            await Threads.setData(event.threadID, options = { settings });
            client.threadSetting.set(event.threadID, settings);
            api.sendMessage("Đã tắt antiOut!", event.threadID);
            break;
        }
    
        default: {
            utils.throwError("antiOut", event.threadID, event.messageID);
            break;
        }
    }*/
}
