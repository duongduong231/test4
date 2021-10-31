module.exports.config = {
	name: "kbb",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Chơi kéo búa bao",
	commandCategory: "Economy",
	usages: "kbb [con] [money]",
	cooldowns: 20,
	info: [
		{
			key: 'con',
			prompt: 'kéo/búa/bao',
			type: 'Văn Bản',
			example: 'bao'
		},
    		{
			key: 'money',
			prompt: 'Số tiền',
			type: 'Số',
			example: '1000'
		}
	]
};		

module.exports.run = async ({ event, api, args, Currencies }) => {
		  const moneydb = (await Currencies.getData(event.senderID)).money;
        if (moneydb == undefined) return api.sendMessage("Người dùng chưa tồn tại!", event.threadID, event.messageID);
				var chon = args[0];
				var money = args[1];
				if (!money) return api.sendMessage(`[ ✌️✊✋ ] Bạn không nhập đủ thông tin kìa :(`, event.threadID, event.messageID);
        (money == "all") ? ((moneydb > 10000) ? money = 10000 : money = moneydb) : "";
				if (isNaN(money)) return api.sendMessage(`[ ✌️✊✋ ] Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại /help kbb`, event.threadID, event.messageID);
    		if (money > moneydb)return api.sendMessage(`[ ✌️✊✋ ] Số tiền của bạn không đủ`, event.threadID, event.messageID); 
				if (money < 200)return api.sendMessage(`[ ✌️✊✋ ] Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 200 LE!`, event.threadID, event.messageID);  
				if (money > 100000) return api.sendMessage(`[ ✌️✊✋ ] Số tiền đặt cược của bạn quá khủng, đặt dưới 100000 LE!`, event.threadID, event.messageID);
					var route = Math.floor(Math.random() * 50);
					if (chon == `búa`) {			
						if(route < 10)return api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Kéo\nBạn thắng, toàn bộ ${money} LE thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + parseInt(money)} LE`,event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
						else if (route > 9 && route < 31) return api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Búa\nHòa, toàn bộ ${money} LE trả về bạn`, event.threadID, event.messageID);
						else api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Bao\nBạn thua, toàn bộ ${money} LE bốc hơi\nSố tiền hiện tại của bạn là: ${moneydb - parseInt(money)} LE`,event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (chon == `bao`){ 
						if(route < 10) return api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Búa\nBạn thắng, toàn bộ ${money} LE thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + parseInt(money)} LE`,event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
						else if (route > 9 && route < 31)return api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Bao\nHòa, toàn bộ ${money} LE trả về bạn`, event.threadID, event.messageID)
						else api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Kéo\nBạn thua, toàn bộ ${money} LE bốc hơi\nSố tiền hiện tại của bạn là: ${moneydb - parseInt(money)} LE`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (chon == `kéo`) {
						if(route < 10)return api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Bao\nBạn thắng, toàn bộ ${money} LE thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + parseInt(money)} LE`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
						else if (route > 9 && route < 31) return api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Kéo\nHòa, toàn bộ ${money} LE trả về bạn`, event.threadID, event.messageID);
						else api.sendMessage(`[ ✌️✊✋ ]\nNhà cái: Búa\nBạn thua, toàn bộ ${money} LE bốc hơi\nSố tiền hiện tại của bạn là: ${moneydb - parseInt(money)} LE`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);    
					}; 
}
