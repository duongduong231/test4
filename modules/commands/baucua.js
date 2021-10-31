module.exports.config = {
	name: "baucua",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Chơi bầu cua",
	commandCategory: "Economy",
	usages: "baucua [con] [money]",
	cooldowns: 10,
	info: [
		{
			key: 'con',
			prompt: 'bầu/cua/tôm/cá/gà/nai',
			type: 'Văn Bản',
			example: 'nai'
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
      const slotItems = ["bầu", "cua", "tôm", "cá", "gà", "nai"];
			const convat = ["🤰", "🦀", "🦐", "🐟", "🐔", "🦌"];
		  const moneydb = (await Currencies.getData(event.senderID)).money;
        if (moneydb == undefined) return api.sendMessage("Người dùng chưa tồn tại!", event.threadID, event.messageID);
				var baucua = args[0]; 
				var money = args[1]; 
        if (!baucua) return api.sendMessage(`[ BẦU CUA ] Bạn không nhập đủ thông tin kìa :(`, event.threadID, event.messageID);
				let win = false;
				let tie = false;
				let lose = false;
				var choose = "";

				if (baucua == slotItems[0])
					choose = 0;
				else if (baucua == slotItems[1])
					choose = 1;
				else if (baucua == slotItems[2])
					choose = 2;
				else if (baucua == slotItems[3])
					choose = 3;
				else if (baucua == slotItems[4])
					choose = 4;
				else if (baucua == slotItems[5])
					choose = 5;
				else
					return api.sendMessage(`[ BẦU CUA ] Vui lòng nhập đúng con, chi tiết tại /help baucua`, event.threadID, event.messageID);
				if (!money)return api.sendMessage("[ BẦU CUA ] Chưa nhập số tiền đặt cược!", event.threadID, event.messageID);
        (money == "all") ? ((moneydb > 10000) ? money = 10000 : money = moneydb) : "";
        if (isNaN(money)) return api.sendMessage(`[ BẦU CUA ] Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại /help baucua`, event.threadID, event.messageID);				
        if (money > moneydb)return api.sendMessage(`[ BẦU CUA ] Số tiền của bạn không đủ`, event.threadID, event.messageID);
				if (money < 200)return api.sendMessage(`[ BẦU CUA ] Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 200 LE!`, event.threadID, event.messageID);
    	if (money > 100000) return api.sendMessage(`[ BẦU CUA ] Số tiền đặt cược của bạn quá khủng, tối đa là 100000 LE!`, event.threadID, event.messageID);
        var i = 0;
				let number = [];
				for (i = 0; i < 3; i++) {
					number[i] = Math.floor(Math.random() * 6);
				}

				let result = number.filter(word => word == choose).length;
				if (result == 3) {
					money *= 9;
					win = true;
					tie = false;
					lose = false;
				}
				else if (result == 2) {
					money *= 2;
					win = true;
					tie = false;
					lose = false;
				}
				else if (!result == 2) {
					money *= 2;
					win = false;
					tie = false;
					lose = true;
				}
				else if (result == 1) {
					money *= 0.2;
					win = false;
					tie = true;  
					lose = false;
				}
				else {
					win = false;
					lose = true;
					tie = false;  
				}

				if (win) {
				api.sendMessage(`[ BẦU CUA ]\n${convat[number[0]]} | ${convat[number[1]]} | ${convat[number[2]]} \n\nBạn đã thắng, toàn bộ ${money} LE thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + money} LE`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
				}
				if (tie) {
				api.sendMessage(`[ BẦU CUA ]\n${convat[number[0]]} | ${convat[number[1]]} | ${convat[number[2]]} \n\nBạn đã thắng 1 nên ${money} LE thuộc về bạn\nSố tiền hiện tại của bạn là: ${moneydb + money} LE`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
				}
				if (lose) {
				api.sendMessage(`[ BẦU CUA ]\n${convat[number[0]]} | ${convat[number[1]]} | ${convat[number[2]]} \n\nBạn đã thua, toàn bộ ${money} LE bay vào không trung xD\nSố tiền hiện tại của bạn là: ${moneydb - money} LE`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
				}
}
