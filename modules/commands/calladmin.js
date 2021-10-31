module.exports.config = {
    name: "calladmin",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Thọ & fixed by banledangyeuu",
    description: "gửi tin nhắn tới admin của bot",
    commandCategory: "group",
    usages: "calladmin [lời nhắn]",
    cooldowns: 3

};

module.exports.handleReaction = function({ api, event, handleReaction, client }) {
  const logger = require("../../utils/log.js");
  return api.setMessageReaction(event.reaction, handleReaction.reactID, (err) => (err) ? logger('Đã có lỗi xảy ra khi thực thi setMessageReaction', 2) : '', true);
}

module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users }) {
    const moment = require("moment-timezone");
    let { senderID, messageID, threadID } = event;
    let data = (await Users.getData(senderID));
    let thread = (await Threads.getData(threadID));
    var time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');
    //if (event.messageReply.senderID == handleReply.senderID) {
    if (handleReply.id == 1) {
      //if (event.messageReply.senderID == handleReply.senderID) return;
      let name = (await Users.getData(event.senderID)).name;
      return api.sendMessage({body :`🔔Phản hồi từ admin ${name}: ${event.body}\n\nReply tin nhắn này để tiếp tục tương tác với ADMIN`}, handleReply.threadID, async (err, info) => {
                client.handleReply.push({ 
                    id: 2,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID: event.threadID,
                    type: "reply"
                });
                client.handleReaction.push({
                    id: 2,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    reactID: event.messageID,
                    threadID: event.threadID,
                    type: 'message_reaction'
                });
    await new Promise(resolve => setTimeout(resolve, 1000))
    }, handleReply.replyID);    
  }
  else if (handleReply.id == 2) {
    for (var id of __GLOBAL.settings.ADMINBOT) {
        api.sendMessage(`=======CALLADMIN=======\n\n⏰ TIME: ${time}\n👤 Name: ${data.name}\n❗ UID: ${senderID}\n👻 Nhóm: ${thread.name}\n😺 ThreadID: ${event.threadID}\n\n✅ Nhắn : ${event.body}`,id, async (err, info) => {
                client.handleReply.push({ 
                    id: 1,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID: event.threadID,
                    type: "reply"
                });
                client.handleReaction.push({
                    id: 1,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    reactID: event.messageID,
                    threadID: event.threadID,
                    type: 'message_reaction'
                });
    await new Promise(resolve => setTimeout(resolve, 1000))
    })      
    return api.sendMessage(`Thông tin của bạn đã được gửi tới các admin ✅\nTime: ${time}`,event.threadID)
    }
  } 
};

module.exports.run = async function({ api, event, args, Currencies, utils, Users, Threads,__GLOBAL,client }) {
    const moment = require("moment-timezone");
    let { senderID, messageID, threadID } = event;
    if (!args[0]) return api.sendMessage("Bạn chưa nhập tin nhắn !", threadID,messageID);
    let data = (await Users.getData(senderID));
    let thread = (await Threads.getData(threadID));
    var time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');
    for (var id of __GLOBAL.settings.ADMINBOT) {
        api.sendMessage(`=======CALLADMIN=======\n\n⏰ TIME: ${time}\n👤 Name: ${data.name}\n❗ UID: ${senderID}\n👻 Nhóm: ${thread.name}\n😺 ThreadID: ${event.threadID}\n\n✅ Nhắn : ${args.join(" ")}`,id, async (err, info) => {
                client.handleReply.push({ 
                    id: 1,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID: event.threadID,
                    type: "reply"
                });
                client.handleReaction.push({
                    id: 1,
                    name: this.config.name,
                    senderID,
                    messageID: info.messageID,
                    reactID: event.messageID,
                    threadID: event.threadID,
                    type: 'message_reaction'
                });
    await new Promise(resolve => setTimeout(resolve, 1000))
    })      
    return api.sendMessage(`Thông tin của bạn đã được gửi tới các admin ✅\nTime: ${time}`,event.threadID)
    }
} 