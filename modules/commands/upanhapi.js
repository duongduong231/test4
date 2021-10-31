module.exports.config = {
  name: "upanh",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "up ảnh lên api Lê",
  commandCategory: "other",
  usages: "upanh [key] [link/reply ảnh]",
  cooldowns: 0,
  dependencies: ["axios"],
        info: [
			{
				key: "key",
				prompt: "girl/boy/body/tattoo/horror/vmeme/jimmy/localbrand/wibu",
				type: 'String',
				example: 'girl'
			}
        ]
};

module.exports.run = async({api, event, args}) => {
  const axios = require('axios');
  const fs = require("fs-extra");
  const request = require("request");
  const https = require("https");
  var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err))))
  if (args[0]== "girl") {
  try {
    if (event.type != "message_reply") {
      let count = 0, err = 0, array = args.join(" ").split(" ")
      for (let i = 1; i < array.length ; i++) {
        let link = await short(args[i]) 
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/girl?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    } else {
      let count = 0, err = 0;
      var att = Object.keys(event.messageReply.attachments); 
      for (let i = 0; i < att.length; i++) {
        let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/girl?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    }
  }catch (e) {
   return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
  } else if (args[0]== "boy") {
  try {
    if (event.type != "message_reply") {
      let count = 0, err = 0, array = args.join(" ").split(" ")
      for (let i = 1; i < array.length ; i++) {
        let link = await short(args[i]) 
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/boy?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    } else {
      let count = 0, err = 0;
      var att = Object.keys(event.messageReply.attachments); 
      for (let i = 0; i < att.length; i++) {
        let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/boy?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    }
  }catch (e) {
   return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
  } else if (args[0]== "tattoo") {
  try {
     if (event.type != "message_reply") {
      let count = 0, err = 0, array = args.join(" ").split(" ")
      for (let i = 1; i < array.length ; i++) {
        let link = await short(args[i]) 
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/tattoo?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    } else {
      let count = 0, err = 0;
      var att = Object.keys(event.messageReply.attachments); 
      for (let i = 0; i < att.length; i++) {
        let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/tattoo?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    }
  }catch (e) {
   return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
  } else if (args[0]== "body") {
  try {
     if (event.type != "message_reply") {
      let count = 0, err = 0, array = args.join(" ").split(" ")
      for (let i = 1; i < array.length ; i++) {
        let link = await short(args[i]) 
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/body?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    } else {
      let count = 0, err = 0;
      var att = Object.keys(event.messageReply.attachments); 
      for (let i = 0; i < att.length; i++) {
        let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/body?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    }
  }catch (e) {
   return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
  } else if (args[0]== "wibu") {
  try {
     if (event.type != "message_reply") {
      let count = 0, err = 0, array = args.join(" ").split(" ")
      for (let i = 1; i < array.length ; i++) {
        let link = await short(args[i]) 
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/wibu?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    } else {
      let count = 0, err = 0;
      var att = Object.keys(event.messageReply.attachments); 
      for (let i = 0; i < att.length; i++) {
        let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/wibu?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    }
  }catch (e) {
   return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
  } else if (args[0]== "localbrand") {
  try {
     if (event.type != "message_reply") {
      let count = 0, err = 0, array = args.join(" ").split(" ")
      for (let i = 1; i < array.length ; i++) {
        let link = await short(args[i]) 
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/localbrand?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    } else {
      let count = 0, err = 0;
      var att = Object.keys(event.messageReply.attachments); 
      for (let i = 0; i < att.length; i++) {
        let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/localbrand?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    }
  }catch (e) {
   return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
  } else if (args[0]== "jimmy") {
  try {
     if (event.type != "message_reply") {
      let count = 0, err = 0, array = args.join(" ").split(" ")
      for (let i = 1; i < array.length ; i++) {
        let link = await short(args[i]) 
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/jimmy?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    } else {
      let count = 0, err = 0;
      var att = Object.keys(event.messageReply.attachments); 
      for (let i = 0; i < att.length; i++) {
        let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/jimmy?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    }
  }catch (e) {
   return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
  } else if (args[0]== "vmeme") {
  try {
     if (event.type != "message_reply") {
      let count = 0, err = 0, array = args.join(" ").split(" ")
      for (let i = 1; i < array.length ; i++) {
        let link = await short(args[i]) 
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/vmeme?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    } else {
      let count = 0, err = 0;
      var att = Object.keys(event.messageReply.attachments); 
      for (let i = 0; i < att.length; i++) {
        let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "photo") ? event.messageReply.attachments[i].url : "":"");
        let res = (await  axios.get(encodeURI(`https://le31.glitch.me/image/upload/vmeme?q=${link}`))).data;
        if (res.status == 0) count++      
        else if (res.status == 1) err++         
		  }
      return api.sendMessage(`Thành công: ${count}\nThất bại: ${err}`, event.threadID, event.messageID);
    }
  }catch (e) {
   return api.sendMessage("Đã có lỗi xảy ra",event.threadID,event.messageID);
  }
  } else return api.sendMessage(`Danh mục không tồn tại`, event.threadID, event.messageID);
}