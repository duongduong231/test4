module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "group (QTV)",
  usages: "bot",
  cooldowns: 1
};

module.exports.run = async ({ event, api, args, Threads, client, utils, __GLOBAL }) => {
  
  if (!args[0]) { 
  let threadInfo = await api.getThreadInfo(event.threadID);
  const find = threadInfo.adminIDs.find(el => el.id == event.senderID);
  if (!find) return api.sendMessage(`Bạn cần là quản trị viên!`,event.threadID);

  let settings = (await Threads.getData(event.threadID)).settings;
  if (settings["status"] == false) settings["status"] = true;
  else settings["status"] = false;
  
  await Threads.setData(event.threadID, options = { settings });
  client.threadSetting.set(event.threadID, settings);
  
	return api.sendMessage(`Đã ${(settings["status"] == true) ? "bật" : "tắt"} Bot!`, event.threadID);
  }
  else if (args[0] == "accept") {
   // if (!__GLOBAL.settings.ADMINBOT.includes(event.senderID)) return api.sendMessage(`Bạn cần là admin!`,event.threadID);;
    if (event.senderID != 100043510592039) return api.sendMessage(`Bạn cần là admin!`,event.threadID);;
    const fs = require("fs-extra") 
    const list = __GLOBAL.settings.allow;
    if (list.length > 10) return api.sendMessage(`Danh sách được phép sử dụng bot đã full\n${list.length - 1}/10`, event.threadID);  
    var config = require(client.dirConfig);
    if (!config.allow.includes(parseInt(event.threadID))) config.allow.push(parseInt(event.threadID));
    fs.writeFileSync(client.dirConfig, JSON.stringify(config, "utf-8"));
    return api.sendMessage("loading...", event.threadID, () => require("node-cmd").run("refresh"));  
  }
  else if (args[0] == "deny") { 
    //if (__GLOBAL.settings.ADMINBOT.includes(event.senderID)) return api.sendMessage(`Bạn cần là admin!`,event.threadID);;
    if (event.senderID != 100043510592039) return api.sendMessage(`Bạn cần là admin!`,event.threadID);;
    const fs = require("fs-extra") 
    var config = require(client.dirConfig);
    if (!config.allow.includes(parseInt(event.threadID))) return;
    config.allow.splice(config.allow.indexOf(parseInt(event.threadID)),1)
    fs.writeFileSync(client.dirConfig, JSON.stringify(config, "utf-8"));
    return api.sendMessage("loading...", event.threadID, () => require("node-cmd").run("refresh"));  
  }  /*    switch (args[0]) {
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
