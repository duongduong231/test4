module.exports.config = {
  name: "exp",
  version: "0.0.1",
  hasPermssion: 2,
  credits: "banledangyeuu",
  description: "Chỉnh sửa điểm tương tác của ai đó hoặc bản thân",
  commandCategory: "Admin",
  usages: "exp [data] [point] [tag]",
  cooldowns: 0,
  info: [
    {
      key: "Data",
      prompt: "add/del/set",
      type: "Văn Bản",
      example: "add"
    },
    {
      key: "Point",
      prompt: "Số điểm",
      type: "Số",
      example: "1000"
    },
    {
      key: "Tag",
      prompt: "Tag một người nào đó",
      type: "Văn Bản",
      example: "@Mirai-chan"
    }
  ]
};

module.exports.run = async function({ api, event, args, Currencies }) {
        var mention = Object.keys(event.mentions)[0];
				if (isNaN(args[1])) return api.sendMessage('Số EXP cần set của bạn không phải là 1 con số!', event.threadID, event.messageID);
				if (args[0] == `set`) return (!mention) ? (!args[2]) ? api.sendMessage("Đã sửa EXP của "+ `${(event.type == "message_reply") ? event.messageReply.senderID : "bản thân"}` +" thành " + args[1] + " LE", event.threadID,async () => await Currencies.setEXP(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`, parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã sửa EXP của ${args[2]} thành ${args[1]} LE.`}, event.threadID, async () => await Currencies.setEXP(args[2], parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã sửa EXP của ${event.mentions[mention].replace("@", "")} thành ${args[1]} LE.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, async () => await Currencies.setEXP(mention, parseInt(args[1])), event.messageID);
				else if (args[0] == `add`) return (!mention) ? (!args[2]) ? api.sendMessage("Đã thêm EXP cho "+ `${(event.type == "message_reply") ? event.messageReply.senderID : "bản thân"}` + " thêm " + args[1] + " LE", event.threadID, async () => await Currencies.increaseEXP(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`, parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã thêm EXP của ${args[2]} thêm ${args[1]} LE.`}, event.threadID, async () => await Currencies.increaseEXP(args[2], parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã thêm EXP của ${event.mentions[mention].replace("@", "")} thêm ${args[1]} LE.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, async () => await Currencies.increaseEXP(mention, parseInt(args[1])), event.messageID);
				else if (args[0] == `sub`) return (!mention) ? (!args[2]) ? api.sendMessage("Đã trừ EXP của "+ `${(event.type == "message_reply") ? event.messageReply.senderID : "bản thân"}` +" đi " + args[1] + " LE", event.threadID, async () => await Currencies.decreaseEXP(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`, parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã trừ EXP của ${args[2]} đi ${args[1]} LE.`}, event.threadID, async () => await Currencies.decreaseEXP(args[2], parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã trừ EXP của ${event.mentions[mention].replace("@", "")} đi ${args[1]} LE.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, async () => await Currencies.decreaseEXP(mention, parseInt(args[1])), event.messageID);
        else if (args[0] == `reset`) {
	      let data =  await Currencies.getAll(['userID']);
        var x = 0;
        var intervalID = setInterval(async function () {
        if (++x > data.length - 1) return clearInterval(intervalID);
        else return await Currencies.setEXP(data[x].userID, 0)
        }, 10);
        } 
};
