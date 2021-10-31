module.exports.config = {
  name: "sim",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "sim",
  commandCategory: "Chatbot",
  usages: "sim",
  cooldowns: 2,
  dependencies: ["request", "fs-extra", "axios"]
};
module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users }) {
  if (event.threadID == 3872788376126728 || event.threadID == 4563174340369177) return;
  const axios = require("axios");
  if (event.senderID == api.getCurrentUserID()) return;
  return axios.get(encodeURI("https://le31.glitch.me/le/ask?q="+ event.body)).then(res => {
      api.sendMessage({ body: res.data.data }, handleReply.threadID, async (err, info) => {
                client.handleReply.push({ 
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID: event.threadID,
                    type: "reply"
                });
      },event.messageID);
    });
}

module.exports.event = async ({ event, api, client, Threads }) => {
  if (event.threadID == 3872788376126728) return;
  let settings = (await Threads.getData(event.threadID)).settings;
  if (settings["status"] == false) return;
  const axios = require("axios");
  if (event.senderID == api.getCurrentUserID()) return;
try {
  const threadData = client.threadSetting.get(event.threadID) || {};
  /*if (threadData["sim"] == true) {
    return axios.get(encodeURI("https://le31.glitch.me/le/ask?q=" + event.body)).then(res => {
    api.sendMessage({ body: res.data.data }, event.threadID, (err, info) => {
                client.handleReply.push({ 
                    id: 1,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID: event.threadID,
                    type: "reply"
                });
      }, event.messageID);
    });
  } else */if (event.body.indexOf("bot") == 0 && event.type != "message_reply" || event.body.indexOf("Bot") == 0 && event.type != "message_reply") {
    if (event.body.length < 4) return axios.get(encodeURI("https://le31.glitch.me/le/ask?q=ơi")).then(res => {
      api.sendMessage({ body: res.data.data }, event.threadID, (err, info) => {
                client.handleReply.push({ 
                    id: 1,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID: event.threadID,
                    type: "reply"
                });
      }, event.messageID);
    });
    else return axios.get(encodeURI("https://le31.glitch.me/le/ask?q=" + event.body.slice(3))).then(res => {
      api.sendMessage({ body: res.data.data }, event.threadID, (err, info) => {
                client.handleReply.push({ 
                    id: 1,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID: event.threadID,
                    type: "reply"
                });
      }, event.messageID);
    });
  }
  } catch (e) {}
};
module.exports.run = async ({ event, api, args, Threads, client }) => {
  const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
  const axios = require("axios");
  try {
  let settings = (await Threads.getData(event.threadID)).settings;
  /*if (args[0] == "off") {
    settings["sim"] = false;
    api.sendMessage(`[SIM] ${settings["sim"] == true ? "bật" : "tắt"}!`, event.threadID);
    await Threads.setData(event.threadID, (options = { settings }));
    return client.threadSetting.set(event.threadID, settings);
  } else if (args[0] == "on") {
    settings["sim"] = true;
    api.sendMessage(`[SIM] ${settings["sim"] == true ? "bật" : "tắt"}!`, event.threadID);
    await Threads.setData(event.threadID, (options = { settings }));
    return client.threadSetting.set(event.threadID, settings);
  } else
   */ return axios.get(encodeURI("https://le31.glitch.me/le/ask?q=" + args.join(" "))).then(res => {
      api.sendMessage({ body: res.data.data }, event.threadID, (err, info) => {
                client.handleReply.push({ 
                    id: 1,
                    name: this.config.name,
                    senderID: event.senderID,
                    messageID: info.messageID,
                    replyID: event.messageID, 
                    threadID: event.threadID,
                    type: "reply"
                });
      }, event.messageID);
    });
    }catch (e) {}
};
