module.exports.config = {
  name: "tarot",
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
  const fs = require("fs-extra");

  let res = (await	axios.get(encodeURI(`https://le31.glitch.me/tarot`))).data;
  let tarot = (await axios.get(res.data.image, { responseType: "arraybuffer" } )).data;
  fs.writeFileSync( __dirname + "/cache/tarot.png", Buffer.from(tarot, "utf-8") );
 
  api.sendMessage({body:`Name: ${res.data.name}\nSuite: ${res.data.suite}\nDescription: ${res.data.description}\nInterpretation: ${res.data.interpretation}`,attachment: fs.createReadStream(__dirname + `/cache/tarot.png`)}, event.threadID, event.messageID);
  return fs.unlinkSync(__dirname + `/cache/tarot.png`);
}