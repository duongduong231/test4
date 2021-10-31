module.exports.config = {
  name: "age",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "other",
  usages: "",
  cooldowns: 1,
  dependencies: ["axios"]
};

module.exports.run = async({api, event, args}) => {
  const axios = require('axios');
  let res = await	axios.get(encodeURI(`https://le31.glitch.me/age?q=${args.join(" ")}`))
  return api.sendMessage(`Máy tính tuổi:\n${res.data.data}`, event.threadID, event.messageID);
}