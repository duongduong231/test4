module.exports.config = {
  name: "antiout",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "banledangyeuu",
  description: "Bật tắt tính năng cấm thành viên rời nhóm",
  commandCategory: "group (QTV)",
  usages: "antiout [on/off]",
  cooldowns: 1
};

module.exports.run = async ({ event, api, args, Threads, client, utils }) => {
  let settings = (await Threads.getData(event.threadID)).settings;
	if (settings["antiOut"] == false) settings["antiOut"] = true;
	else settings["antiOut"] = false;
	
	await Threads.setData(event.threadID, options = { settings });
	client.threadSetting.set(event.threadID, settings);
	
	return api.sendMessage(`Đã ${(settings["antiOut"] == true) ? "bật" : "tắt"} thành công ANTIOUT!`, event.threadID);
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
