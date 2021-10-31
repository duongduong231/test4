module.exports.config = {
  name: "2fa",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "system",
  usages: "",
  cooldowns: 1,
  dependencies: ["authenticator"]
};

module.exports.run = async({api, event, args}) => {
  const authenticator = require('authenticator');
  var formattedToken = authenticator.generateToken(args.join(""));
  // "957 124" 
  var { threadID, messageID } = event;
  return api.sendMessage(formattedToken,threadID,messageID)
}
