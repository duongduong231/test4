module.exports.config = {
  name: "tiny",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "system",
  usages: "",
  cooldowns: 5,
  dependencies: ["https"]
}


module.exports.run = function({ api, event, args }) {
  const https = require("https");
  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  if (!regex.test(args[0])) return api.sendMessage("Phải là một url cần rút gọn!", event.threadID);
  if (args[0].indexOf("http" || "https") === -1) args[0] = "https://" + args[0];
  var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err))))
  try {
  short(args[0]).then(link => api.sendMessage({body:`Shortened links: ${link}`},event.threadID,event.messageID))
  }catch (e) {
 return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
}