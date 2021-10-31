module.exports.config = {
	name: "steal",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "MewMew",
	description: "Trộm yay",
	commandCategory: "Economy",
	usages: "steal",
	cooldowns: 2,
  dependencies: ["parse-ms"],
  envConfig: {
       cooldownTime: 1200000
  }
}

module.exports.run = async function({ event, api, Currencies, Users, __GLOBAL }) {
    const { threadID, messageID, senderID } = event;
    const cooldown = __GLOBAL.steal.cooldownTime;
    const data = (await Currencies.getData(event.senderID)).stealTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
        var time = cooldown - (Date.now() - data),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);     

    return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, event.threadID, event.messageID);
  } 
    else {
          let moneyU = (await Currencies.getData(senderID)).money;
      	  let info =  await Users.getAll(['userID', 'name'])
          //let info = await api.getThreadInfo(event.threadID);
          var i = Math.floor(Math.random() * info.length);
          let victim = info[i].userID;
          //let dataV = await api.getUserInfo(victim);
          let nameV = info[i].name;
          let data = await api.getUserInfo(senderID);
          let name = data[senderID].name;
					if (moneyU < 1 || moneyU == undefined || moneyU == null) return api.sendMessage("Bạn không có tiền, HÃY LÀM VIỆC ĐỂ CÓ ĐƯỢC MỘT SỐ TIỀN LÀM VỐN.", threadID, async () => {
                    await Currencies.setData(event.senderID, { stealTime: Date.now() });
            }, messageID);
          if (victim == api.getCurrentUserID() && victim == senderID) return api.sendMessage("Cần lao vi tiên thủ\nNăng cán dĩ đắc thực\nVô vi thực đầu buồi\nThực cứt thế cho nhanh", event.threadID, async () => {
                    await Currencies.setData(event.senderID, { stealTime: Date.now() });
            }, event.messageID);
					var route = Math.floor(Math.random() * 3);
					if (route < 2) {
						let moneyV = (await Currencies.getData(victim)).money;
						var money = Math.floor(Math.random() * 1000) + 1;
						if (moneyV < 1 || moneyV == undefined || moneyV == null) return api.sendMessage("Bạn vừa ăn cắp từ một người nghèo. Vì vậy, bạn không có gì.", threadID, async () => {
                    await Currencies.setData(event.senderID, { stealTime: Date.now() });
            } , messageID);
             else if (moneyV >= money) return api.sendMessage(`Bạn vừa trộm ${money} LE từ 1 thành viên trong nhóm`, threadID, async() => {
              await Currencies.decreaseMoney(victim, parseInt(money));
							await Currencies.increaseMoney(senderID, parseInt(money));
              await Currencies.setData(event.senderID, { stealTime: Date.now() });
						}, messageID);
            else if (moneyV < money) return api.sendMessage(`Bạn vừa trộm TẤT CẢ ${moneyU} LE của 1 thành viên trong nhóm`, threadID, async () => {
							await Currencies.decreaseMoney(victim, parseInt(money));
							await Currencies.increaseMoney(senderID, parseInt(money));
              await Currencies.setData(event.senderID, { stealTime: Date.now() });
						}, messageID);
          }
					else if (route == 2) return api.sendMessage(`Bạn bị tóm vì tội ăn trộm, mất ${moneyU} LE`, threadID, () => api.sendMessage({body: `Chúc mừng anh hùng ${nameV} tóm gọn tên trộm ${name} và đã nhận được tiền thưởng ${Math.floor(parseInt(moneyU) / 2)} LE`, mentions: [{ tag: nameV, id: victim}, {tag: name, id: senderID}]}, threadID, async () => {
								await Currencies.decreaseMoney(senderID, parseInt(moneyU));
								await Currencies.increaseMoney(victim, parseInt(Math.floor(parseInt(moneyU) / 2)));
                await Currencies.setData(event.senderID, { stealTime: Date.now() });
							}), messageID);
       } //return await Currencies.setData(event.senderID, { stealTime: Date.now() });
}