module.exports.config = {
  name: "ghep",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "Ghép đôi với 1 đứa trong nhóm",
  commandCategory: "Group",
  usages: "ghep",
  cooldowns: 1,
  dependencies: ["axios", "fs-extra"],
  envConfig: {
       cooldownTime: 600000,
  }
};
module.exports.run = async function({ api, event, args, Users,__GLOBAL,Currencies }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const { threadID, messageID } = event;
  const cooldown = __GLOBAL.ghep.cooldownTime;
  const data = (await Currencies.getData(event.senderID)).ghepTime;
  if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
      var time = cooldown - (Date.now() - data),
          minutes = Math.floor(time / 60000),
          seconds = ((time % 60000) / 1000).toFixed(0);       
    return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, event.threadID, event.messageID);
  }
  else {
  var mention = Object.keys(event.mentions)[0];
  var emoji = ["♥️","❤️","💛","💚","💙","💜","🖤","💖","💝","💓","💘","💍","🎁","💋","💎","💠","🌈","🌍","🌕","☀️"]
  var random_emoji = emoji[Math.floor(Math.random() * emoji.length)];
  if (!mention) {
    let threadInfo = await api.getThreadInfo(event.threadID);
    let all = threadInfo.participantIDs;
    await all.splice(all.indexOf(api.getCurrentUserID()), 1);
    await all.splice(all.indexOf(event.senderID), 1);
    var random = all[Math.floor(Math.random() * all.length)];
    let data = await api.getUserInfo(parseInt(random));
    let dt = await api.getUserInfo(event.senderID);
    if ( dt[event.senderID].gender == data[parseInt(random)].gender) {
    var gender1 = dt[event.senderID].gender == 1 ? "Chồng của" : dt[event.senderID].gender == 2 ? "Vợ của" : "BêĐê của" 
    var gender2 = data[parseInt(random)].gender == 1 ? "Vợ của" : data[random].gender == 2 ? "Chồng của" : "BêĐê của"   
    } else {
    var gender1 = dt[event.senderID].gender == 1 ? "Vợ của" : dt[event.senderID].gender == 2 ? "Chồng của" : "BêĐê của" 
    var gender2 = data[parseInt(random)].gender == 1 ? "Vợ của" : data[random].gender == 2 ? "Chồng của" : "BêĐê của"   
    }	
    let Avatar1 = (await axios.get( `https://le31.glitch.me/avt?q=${event.senderID}`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/avt1.png", Buffer.from(Avatar1, "utf-8") );
    let Avatar2 = (await axios.get( `https://le31.glitch.me/avt?q=${random}`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );
    let name1 = dt[event.senderID].name;
    let name2 = data[parseInt(random)].name;
    if (name2 == undefined) {
      api.changeNickname( `${gender1} ${name1} ${random_emoji}`, event.threadID, parseInt(random) );
      api.changeNickname( `${gender2} 1 người chưa biết tên ${random_emoji}`, event.threadID,async () => await Currencies.setData(event.senderID, { ghepTime: Date.now() }),  event.senderID );
    } else {
      api.changeNickname( `${gender1} ${name1} ${random_emoji}`, event.threadID, parseInt(random) );
      api.changeNickname( `${gender2} ${name2} ${random_emoji}`, event.threadID, event.senderID );
      api.sendMessage( { body: `${name1} đã được ghép đôi ngẫu nhiên với với ${name2}`, attachment: [fs.createReadStream(__dirname + `/cache/avt1.png`),fs.createReadStream(__dirname + `/cache/avt2.png`)], mentions: [{ tag: name1, id: event.senderID },{ tag: name2, id: random }]}, event.threadID, async () => await Currencies.setData(event.senderID, { ghepTime: Date.now() }));
      fs.unlinkSync(__dirname + `/cache/avt1.png`);
      fs.unlinkSync(__dirname + `/cache/avt2.png`);
    }
  } else {
    let data = await api.getUserInfo(mention);
    let dt = await api.getUserInfo(event.senderID);
    if ( dt[event.senderID].gender == data[parseInt(mention)].gender) {
    var gender1 = dt[event.senderID].gender == 1 ? "Chồng của" : dt[event.senderID].gender == 2 ? "Vợ của" : "BêĐê của" 
    var gender2 = data[parseInt(mention)].gender == 1 ? "Vợ của" : data[mention].gender == 2 ? "Chồng của" : "BêĐê của"   
    } else {
    var gender1 = dt[event.senderID].gender == 1 ? "Vợ của" : dt[event.senderID].gender == 2 ? "Chồng của" : "BêĐê của" 
    var gender2 = data[parseInt(mention)].gender == 1 ? "Vợ của" : data[mention].gender == 2 ? "Chồng của" : "BêĐê của"   
    }	
    let Avatar1 = (await axios.get( `https://le31.glitch.me/avt?q=${event.senderID}`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/avt1.png", Buffer.from(Avatar1, "utf-8") );
    let Avatar2 = (await axios.get( `https://le31.glitch.me/avt?q=${mention}`, { responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );
    let name1 = dt[event.senderID].name;
    let name2 = data[mention].name;
    if (name2 == undefined) {
      api.changeNickname( `${gender1} ${name1} ${random_emoji}`, event.threadID, mention );
      api.changeNickname( `${gender2} 1 người chưa biết tên ${random_emoji}`, event.threadID,async () => await Currencies.setData(event.senderID, { ghepTime: Date.now() }),  event.senderID );  
    } else {
      api.changeNickname( `${gender1} ${name1} ${random_emoji}`, event.threadID, mention );
      api.changeNickname( `${gender2} ${name2} ${random_emoji}`, event.threadID, event.senderID );
      api.sendMessage({body: `${name1} đã ghép đôi với ${name2}`,attachment: [fs.createReadStream(__dirname + `/cache/avt1.png`),fs.createReadStream(__dirname + `/cache/avt2.png`)],mentions: [{ tag: name1, id: event.senderID},{ tag: name2, id: mention }]}, event.threadID,async () => await Currencies.setData(event.senderID, { ghepTime: Date.now() }));
      fs.unlinkSync(__dirname + `/cache/avt1.png`);
      fs.unlinkSync(__dirname + `/cache/avt2.png`);
    }
  }
  }
};