module.exports.config = {
	name: "rule",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Tùy biến luật cho từng group",
	commandCategory: "group",
	usages: "[add/remove/all] [content/ID]",
	cooldowns: 5
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = require("fs-extra");
    const { join } = require("path");
    const pathData = join(__dirname, "cache", "rules.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = async({ event, api, args, client, Threads }) => {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = require("fs-extra");
    const { join } = require("path");

    const pathData = join(__dirname, "cache", "rules.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, listRule: [] };

    switch (args[0]) {
        case "add": {
            var threadInfo = await api.getThreadInfo(event.threadID);
            const find = threadInfo.adminIDs.find(el => el.id == event.senderID);
            if (!find) return api.sendMessage("[Rule] Bạn không đủ quyền hạn để có thể sử dụng thêm luật!", threadID, messageID);
            if (content.length == 0) return api.sendMessage("[Rule] Phần nhập thông tin không được để trống", threadID, messageID);
            if (content.indexOf("\n") != -1) {
                const contentSplit = content.split("\n");
                for (const item of contentSplit) thisThread.listRule.push(item);
            }
            else {
                thisThread.listRule.push(content);
            }
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage('[Rule] Đã thêm luật mới cho nhóm thành công!', threadID, messageID);
            break;
        }
        case "list":
        case"all": {
            var msg = "", index = 0;
            for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
            if (msg.length == 0) return api.sendMessage("[Rule] Nhóm của bạn hiện tại chưa có danh sách luật để hiển thị!", threadID, messageID);
            api.sendMessage(`=== Luật của nhóm ===\n\n${msg}`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "del":
        case "delete": {
            if (!isNaN(content) && content > 0) {
                var threadInfo = await api.getThreadInfo(event.threadID);
                const find = threadInfo.adminIDs.find(el => el.id == event.senderID);
                if (!find) return api.sendMessage("[Rule] Bạn không đủ quyền hạn để có thể sử dụng xóa luật!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("[Rule] Nhóm của bạn chưa có danh sách luật để có thể xóa!", threadID, messageID);
                thisThread.listRule.splice(content - 1, 1);
                api.sendMessage(`[Rule] Đã xóa thành công luật có số thứ tự thứ ${content}`, threadID, messageID);
                break;
            }
            else if (content == "all") {
                var threadInfo = await api.getThreadInfo(event.threadID);
                const find = threadInfo.adminIDs.find(el => el.id == event.senderID);
                if (!find) return api.sendMessage("[Rule] Bạn không đủ quyền hạn để có thể sử dụng xóa luật!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("[Rule] Nhóm của bạn chưa có danh sách luật để có thể xóa!", threadID, messageID);
                thisThread.listRule = [];
                api.sendMessage(`[Rule] Đã xóa thành công toàn bộ luật của nhóm!`, threadID, messageID);
                break;
            }
        }
        default: {
            if (thisThread.listRule.length != 0) {
                var msg = "", index = 0;
                for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
                return api.sendMessage(`=== Luật của nhóm ===\n\n${msg} \n[Việc tuân thủ luật của nhóm sẽ đóng góp tích cực đến cộng động của bạn!]`, threadID, messageID);
            }
            else return api.sendMessage("[Rule] Nhóm của bạn hiện tại chưa có danh sách luật để hiển thị!", threadID, messageID);
                     
        }
    }

    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}