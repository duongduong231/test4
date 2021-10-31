module.exports.config = {
	name: "log",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "CatalizCS",
	description: "Ghi lại thông báo các hoạt đông của bot!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads, __GLOBAL }) {
    const logger = require("../../utils/log");
    const axios = require("axios");
    const fs = require("fs-extra");

    if (__GLOBAL[this.config.name].enable != true) return;
  
    let threadInfo = await api.getThreadInfo(event.threadID);
    let img = threadInfo.imageSrc;
    var formReport =  "=== Bot Notification ===" +
                        "\n\n» Thread "+ threadInfo.name + " mang ID: " + event.threadID +
                        "\n» Hành động: {task}" +
                        "\n» Hành động được tạo bởi userID: " + event.author +
                        "\n» " + Date.now() +" «",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Tên không tồn tại",
                    newName = event.logMessageData.name || "Tên không tồn tại";
            task = "Người dùng thay đổi tên nhóm từ: '" + oldName + "' thành '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "Người dùng đã thêm bot vào một nhóm mới!";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "Người dùng đã kick bot ra khỏi nhóm!"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);
    let Avatar = (await axios.get(img,{ responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/log.png",Buffer.from(Avatar, "utf-8"));

    (img == null) ? api.sendMessage(formReport, __GLOBAL.settings.ADMINBOT[0], (error, info) => {if (error) return logger(formReport, "[ Logging Event ]")}) : api.sendMessage({body: formReport, attachment: fs.createReadStream(__dirname + `/cache/log.png`)}, __GLOBAL.settings.ADMINBOT[0], (error, info) => {(error) ? logger(formReport, "[ Logging Event ]") : fs.unlinkSync(__dirname + `/cache/log.png`)});
}