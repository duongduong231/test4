module.exports.config = {
  name: "tes",
  version: "",
  hasPermssion: 2,
  credits: "bla bal",
  description: "",
  commandCategory: "other",
  usages: ""
};


module.exports.run = async ({ event, args, api, client }) => {
const fs = require("fs-extra");
var bans = JSON.parse(fs.readFileSync(__dirname + `/cache/bans.json`)); 
let a = JSON.stringify(bans.banned[event.threadID])
api.sendMessage(`${a.includes(100071323323049)}`,event.threadID)

};
