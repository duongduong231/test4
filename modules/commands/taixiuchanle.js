module.exports.config = {
	name: "tx",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Chơi tài xỉu",
	commandCategory: "Economy",
	usages: "tx [con] [money]",
	cooldowns: 10,
	info: [
		{
			key: 'con',
			prompt: 'tài/xỉu/chẵn/lẻ/bộba',
			type: 'Văn Bản',
			example: 'tài'
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
        if (!chon) return api.sendMessage(`[ TÀI XỈU CHẴN LẺ ] Bạn không nhập đủ thông tin kìa :(`, event.threadID, event.messageID);
				var choose = "";
				if (!money)return api.sendMessage("[ TÀI XỈU CHẴN LẺ ] Chưa nhập số tiền đặt cược!", event.threadID, event.messageID);
        (money == "all") ? ((moneydb > 10000) ? money = 10000 : money = moneydb) : "";
        if (isNaN(money)) return api.sendMessage(`[ TÀI XỈU CHẴN LẺ ] Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại /help roul`, event.threadID, event.messageID);
				if (money > moneydb) return api.sendMessage(`[ TÀI XỈU CHẴN LẺ ] Số tiền của bạn không đủ`, event.threadID, event.messageID);
				if (money < 200)return api.sendMessage(`[ TÀI XỈU CHẴN LẺ ] Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 200 LE!`, event.threadID, event.messageID);
    			if (money > 100000) return api.sendMessage(`[ TÀI XỈU CHẴN LẺ ] Số tiền đặt cược của bạn quá khủng, tối đa là 100000 LE!`, event.threadID, event.messageID);
          
				if (chon == "bộba")
					choose = 0;
				else if (chon == "tài")
					choose = 1;
				else if (chon == "xỉu")
					choose = 2;
				else if (chon == "chẵn")
					choose = 3;
				else if (chon == "lẻ")
					choose = 4;
				else
					return api.sendMessage(`[ TÀI XỈU CHẴN LẺ ] Vui lòng nhập đúng tài hoặc xỉu, chi tiết tại /help tx`, event.threadID, event.messageID);

				// Generation
				let number = [];
        var i = 0;
				for (i = 0; i < 3; i++) {
					number[i] = Math.floor(Math.random() * 6) +1;
				}
				//bộ ba
				if (choose == 0) {
					if (Currencies.boba(number) && choose == 0) {
						money *= 9;
						api.sendMessage(`[ TÀI XỈU CHẴN LẺ ]\nKết quả là một bộ ba: ${number[0]} - ${number[1]} - ${number[2]}\nBạn đã chọn Bộ ba, bạn đã thắng với số tiền được nhân lên 9: ${money * 9} LE\nSố tiền hiện tại của bạn là: ${moneydb + money} LE`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					} else {
						return api.sendMessage(`[ TÀI XỈU CHẴN LẺ ]\nĐây không phải bộ ba: ${number[0]} - ${number[1]} - ${number[2]}\nBạn đã ra đê ở và mất trắng số tiền: ${money} LE :'(\nSố tiền hiện tại của bạn là: ${moneydb - money} LE`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					} 
				}
				//tài xỉu
				if (choose == 1 || choose == 2) {
					if (Currencies.taixiu(number) == "tài" && choose == 1) {
						money *= 0.5;  
            api.sendMessage(`[ TÀI XỈU CHẴN LẺ ]\nKết quả là Tài\nBạn đã chọn tài, bạn đã thắng với số tiền được nhân lên 0.5: ${money} LE\nSố tiền hiện tại của bạn là: ${moneydb + money} LE`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (Currencies.taixiu(number) == "xỉu" && choose == 2) {
						money *= 0.5;
						api.sendMessage(`[ TÀI XỈU CHẴN LẺ ]\nKết quả là Xỉu\nBạn đã chọn xỉu, bạn đã thắng với số tiền được nhân lên 0.5: ${money} LE\nSố tiền hiện tại của bạn là: ${moneydb + money} LE`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					} else {
						api.sendMessage(`[ TÀI XỈU CHẴN LẺ ]\nKết quả là ${Currencies.taixiu(number)}\nBạn đã ra đê ở và mất trắng số tiền: ${money} LE\nSố tiền hiện tại của bạn là: ${moneydb - money} LE`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
				}
				//chẵn lẻ
				if (choose == 3 || choose == 4) {
					if (Currencies.chanle(number) == "chẵn" && choose == 3) {
						money *= 0.5;
						api.sendMessage(`[ TÀI XỈU CHẴN LẺ ]\nKết quả là Chẳn\nBạn đã chọn chẳn, bạn đã thắng với số tiền là: ${money} LE\nSố tiền hiện tại của bạn là: ${moneydb + money} LE`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else if (Currencies.chanle(number) == "lẻ" && choose == 4) {
						money *= 0.5;
						api.sendMessage(`[ TÀI XỈU CHẴN LẺ ]\nKết quả là Lẻ\nBạn đã chọn lẻ, bạn đã thắng với số tiền là: ${money} LE\nSố tiền hiện tại của bạn là: ${moneydb + money} LE`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(money)), event.messageID);
					}
					else {
						api.sendMessage(`[ TÀI XỈU CHẴN LẺ ]\nKết quả là ${Currencies.chanle(number)}\nBạn đã ra đê ở và mất trắng số tiền: ${money} LE\nSố tiền hiện tại của bạn là: ${moneydb - money} LE`, event.threadID, () => Currencies.decreaseMoney(event.senderID, parseInt(money)), event.messageID);}  
				  }      
}
