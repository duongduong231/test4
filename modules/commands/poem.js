module.exports.config = {
  name: "poem",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "other",
  usages: "poem",
  cooldowns: 5,
  dependencies: ["fs-extra"]
};
module.exports.run = async function({ event, api, args }) {
  const axios = require("axios");
  if (!args[0]) {
  let res = await axios.get(`https://le31.glitch.me/poem` );
  return api.sendMessage(`${res.data.data}` , event.threadID, event.messageID);
  }
 if (args[0] == "add") {
    var poem =  (event.type == "message_reply") ? event.messageReply.body : args.join(" ").slice(4);
    let res = await axios.get(encodeURI(`https://le31.glitch.me/poem/request?q=${poem}`))
    return api.sendMessage(`${res.data.data}`, event.threadID);
    }
};
