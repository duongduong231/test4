module.exports.config = {
  name: "taglientuc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "other",
  usages: "",
  cooldowns: 60
};
module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID, messageID } = event;
  var mention = Object.keys(event.mentions)[0];
  let data = await api.getUserInfo(mention);
  var text = ["Ê","Condilon","Dậy đi","Đmm dậy","Kiki ơi dậy đi","Mày trốn đâu rồi","Ra biểu coi","Em yêu"];
  var x = 0;
  var intervalID = setInterval(function () {
   if (++x > 10) return clearInterval(intervalID);
   else return api.sendMessage({body: `${text[Math.floor(Math.random() * text.length)]} ${data[mention].name}`,mentions: [{ tag: data[mention].name, id: mention }]},threadID);
}, 3000);
  /*
  for (var i = 0; i < value; i++) {
    (function() {
      setTimeout(function() {
        api.sendMessage({body: `${text[Math.floor(Math.random() * text.length)]} ${data[mention].name}`,mentions: [{ tag: data[mention].name, id: mention }]},threadID);
      }, 5000);
    })();
  }*/
  return;
};
