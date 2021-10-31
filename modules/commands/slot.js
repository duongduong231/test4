module.exports.config = {
    name: "slot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "CatalizCS",
    description: "Đánh bạc bằng hình thức hoa quả",
    commandCategory: "economy",
    usages: "slot số coin đặt cược",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args, Currencies }) {
    const slotItems = ["🍇", "🍉", "🍊", "🍏", "7⃣", "🍓", "🍒", "🍌", "🥝", "🥑", "🌽"];
    const moneyUser = (await Currencies.getData(event.senderID)).money;
    if (moneyUser == undefined) return api.sendMessage("Người dùng chưa tồn tại!", event.threadID, event.messageID);
    var moneyBet = args[0];
    (moneyBet == "all") ? ((moneyUser > 10000) ? moneyBet = 10000 : moneyBet = moneyUser) : "";
    if (isNaN(moneyBet)) return api.sendMessage("[ SLOT ] Số LE đặt cược không được để trống hoặc là số âm", event.threadID, event.messageID);
    if (moneyBet > moneyUser) return api.sendMessage("[ SLOT ] Số LE bạn đặt lớn hơn số dư của bạn!", event.threadID, event.messageID);
    if (moneyBet < 50) return api.sendMessage("[ SLOT ] Số LE đặt không được dưới 50 LE!", event.threadID, event.messageID);
    if (moneyBet > 10000) return api.sendMessage("[ SLOT ] Số LE đặt không được quá 10000 LE!", event.threadID, event.messageID);
    var number = [], win = false;
    for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
    if (number[0] == number[1] && number[1] == number[2]) {
        moneyBet *= 9;
        win = true;
    }
    else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
        moneyBet *= 2;
        win = true;
    }
    switch (win) {
        case true: {
            api.sendMessage(`[ SLOT ]\n🎰 ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]} 🎰\nBạn đã thắng với ${moneyBet} LE`, event.threadID,event.messageID);
            return Currencies.increaseMoney(event.senderID, parseInt(moneyBet));
            break;
        }
        case false: {
            api.sendMessage(`[ SLOT ]\n🎰 » ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]} « 🎰\nBạn đã thua và mất ${moneyBet} LE`, event.threadID, event.messageID);
            return Currencies.decreaseMoney(event.senderID, parseInt(moneyBet));
            break;
        }
    }
}