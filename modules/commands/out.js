module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "banledangyeuu",
    description: "",
    commandCategory: "group",
    usages: "out [lời nhắn]",
    cooldowns: 3

};

module.exports.handleReaction = async function({ api, event, handleReaction, client }) {
var threadInfo = await api.getThreadInfo(event.threadID);
let { senderID, messageID, threadID } = event;
(!threadInfo.adminIDs.find(el => el.id == event.userID)) ? api.sendMessage("Bạn không phải quản trị viên để phê duyệt xin rời!", threadID,messageID) : (!threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID())) ? api.sendMessage("Bot chưa được thêm làm quản trị viên!", threadID,messageID) : api.removeUserFromGroup(handleReaction.senderID,event.threadID)
}


module.exports.run = async function({ api, event, args, Currencies, utils, Users, Threads,__GLOBAL,client }) {
    const moment = require("moment-timezone");
    let { senderID, messageID, threadID } = event;
    let data = (await Users.getData(senderID));
    if (!args[0]) return api.sendMessage("Bạn chưa nhập tin nhắn !", threadID,messageID);
    else return api.sendMessage(`Thành viên: ${data.name}\nXin rời nhóm với lý do: ${args.join(" ")}\n\nQTV react vào tin nhắn này để đồng ý cho thành viên rời`,threadID, (err, info) => {
                client.handleReaction.push({
                    name: this.config.name,
                    senderID,
                    messageID: info.messageID,
                    reactID: event.messageID,
                    threadID,
                    type: 'message_reaction'
                });
    })          
} 