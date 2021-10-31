module.exports.config = {
  name: "10mm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "admin",
  usages: "",
  cooldowns: 2,
  dependencies: ["axios"]
};

module.exports.run = async({api, event, args}) => {
  const axios = require('axios');
  const fs = require("fs-extra");
  if (args[0] == "new") {
  let res = (await	axios.get(encodeURI(`https://10minutemail.net/address.api.php?new=1`))).data;
  api.sendMessage(`mail: ${res.mail_get_mail}\nhost: ${res.mail_get_host}\ntime left: ${res.mail_left_time}s\n\nmail list:\nmailID: ${res.mail_list.mail_id}\nfrom: ${res.mail_list.from}\nfrom: ${res.mail_list.from}\nsubject: ${res.mail_list.subject}\ntimeago: ${res.mail_list.timeago}s`,event.threadID)
  } else if (args[0] == "more") {  
  let res = (await	axios.get(encodeURI(`https://10minutemail.net/address.api.php?more=1`))).data;
  api.sendMessage(`mail: ${res.mail_get_mail}\nhost: ${res.mail_get_host}\ntime left: ${res.mail_left_time}s\n\nmail list:\nmailID: ${res.mail_list.mail_id}\nfrom: ${res.mail_list.from}\nfrom: ${res.mail_list.from}\nsubject: ${res.mail_list.subject}\ntimeago: ${res.mail_list.timeago}s`,event.threadID)
  } else if (args[0] == "recover") {  
  let res = (await	axios.get(encodeURI(`https://10minutemail.net/address.api.php?recover=1`))).data;
  api.sendMessage(`mail: ${res.mail_get_mail}\nhost: ${res.mail_get_host}\ntime left: ${res.mail_left_time}s\n\nmail list:\nmailID: ${res.mail_list.mail_id}\nfrom: ${res.mail_list.from}\nfrom: ${res.mail_list.from}\nsubject: ${res.mail_list.subject}\ntimeago: ${res.mail_list.timeago}s`,event.threadID)
  } else {
  let res = (await	axios.get(encodeURI(`https://10minutemail.net/address.api.php`))).data;
  api.sendMessage(`mail: ${res.mail_get_mail}\nhost: ${res.mail_get_host}\ntime left: ${res.mail_left_time}s\n\nmail list:\nmailID: ${res.mail_list[0].mail_id}\nfrom: ${res.mail_list[0].from}\nsubject: ${res.mail_list[0].subject}\ntimeago: ${res.mail_list[0].timeago}s`,event.threadID)
  }
}