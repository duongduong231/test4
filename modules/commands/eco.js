module.exports.config = {
	name: "eco",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "banledangyeuu",
	description: "Thiết lập tiền của 1 người dùng",
	commandCategory: "Admin",
	usages: "eco [data] [money] [tag]",
	cooldowns: 0,
	info: [
		{
			key: 'Data',
			prompt: 'set/add/sub',
			type: 'Văn Bản',
			example: 'add'
		},
    		{
			key: 'Money',
			prompt: 'Số tiền',
			type: 'Số',
			example: '1000'
		},
    		{
			key: 'Tag',
			prompt: 'Tag một người nào đó',
			type: 'Văn Bản',
			example: '@Mirai-chan'
		}
	]
};

module.exports.run = async function({ api, event, args, Currencies }) {			
        var mention = Object.keys(event.mentions)[0];
				if (isNaN(args[1])) return api.sendMessage('Số tiền cần set của bạn không phải là 1 con số!', event.threadID, event.messageID);
				if (args[0] == `set`) return (!mention) ? (!args[2]) ? api.sendMessage("Đã sửa tiền của "+ `${(event.type == "message_reply") ? event.messageReply.senderID : "bản thân"}` +" thành " + args[1] + " LE", event.threadID,async () => await Currencies.setMoney(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`, parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã sửa tiền của ${args[2]} thành ${args[1]} LE.`}, event.threadID, async () => await Currencies.setMoney(args[2], parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã sửa tiền của ${event.mentions[mention].replace("@", "")} thành ${args[1]} LE.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, async () => await Currencies.setMoney(mention, parseInt(args[1])), event.messageID);
				else if (args[0] == `add`) return (!mention) ? (!args[2]) ? api.sendMessage("Đã thêm tiền cho "+ `${(event.type == "message_reply") ? event.messageReply.senderID : "bản thân"}` + " thêm " + args[1] + " LE", event.threadID, async () => await Currencies.increaseMoney(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`, parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã thêm tiền của ${args[2]} thêm ${args[1]} LE.`}, event.threadID, async () => await Currencies.increaseMoney(args[2], parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã thêm tiền của ${event.mentions[mention].replace("@", "")} thêm ${args[1]} LE.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, async () => await Currencies.increaseMoney(mention, parseInt(args[1])), event.messageID);
				else if (args[0] == `sub`) return (!mention) ? (!args[2]) ? api.sendMessage("Đã trừ tiền của "+ `${(event.type == "message_reply") ? event.messageReply.senderID : "bản thân"}` +" đi " + args[1] + " LE", event.threadID, async () => await Currencies.decreaseMoney(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`, parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã trừ tiền của ${args[2]} đi ${args[1]} LE.`}, event.threadID, async () => await Currencies.decreaseMoney(args[2], parseInt(args[1])), event.messageID) : api.sendMessage({body: `Bạn đã trừ tiền của ${event.mentions[mention].replace("@", "")} đi ${args[1]} LE.`,mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]}, event.threadID, async () => await Currencies.decreaseMoney(mention, parseInt(args[1])), event.messageID);
        else if (args[0] == `reset`) {
	      let data =  await Currencies.getAll(['userID']);
        var x = 0;
        var intervalID = setInterval(async function () {
        if (++x > data.length - 1 ) return clearInterval(intervalID);
        else return await Currencies.setMoney(data[x].userID, 0)
        }, 10);
        } 
}