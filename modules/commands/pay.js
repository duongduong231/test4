module.exports.config = {
	name: "pay",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Chuyển tiền cho người được tag",
	commandCategory: "Economy",
	usages: "pay [Money] [Tag]",
	cooldowns: 5,
	info: [
		{
			key: 'Money',
			prompt: 'số tiền muốn chuyển',
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

module.exports.run = async function({ api, event, args, Currencies, utils }) {
    var mention = Object.keys(event.mentions)[0];
    var id = (event.type == "message_reply") ? event.messageReply.senderID : mention;
    var moneyPay = args[0];
		const moneydb = (await Currencies.getData(event.senderID)).money;
        if (moneydb == undefined) return api.sendMessage("Người dùng chưa tồn tại!", event.threadID, event.messageID);
        if (event.mentions == undefined ) return api.sendMessage("Người dùng chưa tồn tại!", event.threadID, event.messageID);
        if (!moneyPay) return api.sendMessage("Bạn chưa nhập số tiền cần chuyển!", event.threadID, event.messageID);
        if (isNaN(moneyPay) || moneyPay.indexOf("-") !== -1) return api.sendMessage(`Số tiền bạn nhập không hợp lệ, vui lòng xem lại cách sử dụng tại /help pay`, event.threadID, event.messageID);
        if (moneyPay > moneydb) return api.sendMessage('Số tiền mặt trong người bạn không đủ, vui lòng kiểm tra lại số tiền bạn đang có!', event.threadID, event.messageID);
        if (moneyPay < 50) return api.sendMessage(`Số tiền cần chuyển của bạn quá nhỏ, tối thiểu là 50 LE!`, event.threadID, event.messageID);
        Currencies.decreaseMoney(event.senderID, parseInt(moneyPay));
        var lai = 10;
        var tienlai = ((moneyPay*lai)/100);
        var moneyPaytrutienlai = (moneyPay - tienlai)
        api.sendMessage(
            {body:`Bạn đã chuyển ${moneyPaytrutienlai} LE cho ${(event.type == "message_reply") ? event.messageReply.senderID : event.mentions[mention].replace("@", "")} với cước chuyển khoảng là 10%`,mentions: [{tag: (event.type == "message_reply") ? event.messageReply.senderID : event.mentions[mention].replace("@", ""),id: id}]},event.threadID,
            () => {
                Currencies.increaseMoney(id, parseInt(moneyPaytrutienlai));
            },
            event.messageID)
}