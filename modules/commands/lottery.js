module.exports.config = {
	name: "lottery",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Thùy",
	description: "say bla bla ở đây",
	commandCategory: "economy",
	usages: "lottery [arg]",
  hide: true,
	cooldowns: 5,
	info: [
		{
			key: 'start',
			prompt: '',
			type: 'Văn Bản',
			example: 'lottery start'
		},
		{
			key: 'bet',
			prompt: 'đặt cược: lottery [số may mắn] [số tiền]',
			type: 'số',
			example: 'lottery 22 2200803'
		},
		{
			key: 'list',
			prompt: 'Kiểm tra danh sách đặt cược của bạn',
			type: 'số',
			example: 'lottery list'
		}
	]
};

module.exports.schedule = async function ({ event, api, Users, Threads, Currencies }) {
	let { threadID, messageID } = event;
	const out = (msg) => api.sendMessage(msg, threadID, messageID);	
    var Thread = (await Threads.getData(threadID)).settings;    
    var participants = Thread["lottery"]["participants"];
    const random = () => Math.floor(Math.random() * 99);
    var data = {
	    "all": [],
	    "_0": [],
	    "_1": [],
	    "_2": [],
	    "_3": [],
	    "participants": [],
	    "win": {
	        "_0": [],
	        "_1": [],
	        "_2": [],
	        "_3": []
	    }
	  };
  
    if (data['_0'].length == 0) {
    	var rand = random();
    	sameTest(rand, data['_0']);
    }
    for (let i = 0; i < 2; i++) {
    	var rand = random();    	
    	sameTest(rand, data['_1']);
    }
    for (let i = 0; i < 3; i++) {
    	var rand = random();
    	sameTest(rand, data['_2']);
    }
    for (let i = 0; i < 4; i++) {
    	var rand = random();
    	sameTest(rand, data['_3']);
    }
    for (var e of participants) {
      let userdata = await Currencies.getData(e);
      data['participants'].push = { userID: e, money: userdata.money, lottery: userdata.lottery };
    }
    function sameTest(num, arr) {
    	var all = data['all'];
    	if (!all.includes(num)) {
    		arr.push(num);
    		all.push(num);
    	} else {
    		fixSame(arr);
    	}
    }

    function fixSame(arr) {
    	var rand = random();
    	var all = data['all'];
    	if (!all.includes(rand)) {
    		arr.push(rand);
    		all.push(rand);
    	}    	
    }

    function winData() {
    	var type = ["_0", "_1", "_2", "_3"];
    	for (let f of type) {    		
	    	for (let e of data.participants) {
	    		for (let i of e.lottery) {
	    			for (let u of data[f]) {
	    				if (u == i.number) {
	    					data['win'][f].push({ userID: e, num: u, money: i.money });
	    				}
	    			}
	    		}
	    	}
    	}
      getList();
    }
        
    async function getList() {   	
    	var type = ["_0", "_1", "_2", "_3"];
    	var text = "Trúng giải:\n", dac_biet = "\nĐặc biệt: ", giai_nhat = "\nGiải nhất: ", giai_nhi = "\nGiải nhì: ", giai_ba = "\nGiải ba: "
    	for (let e of type) {
    		for (let i of data['win'][e]) {
    			if (e == "_0") {
					var name = (await Users.getData(i.userID)).name;
					var lottery = await Currencies.getData(i.userID);
					var money = i.money;
					money = money * 70;
					lottery.money = lottery.money + money;
					if (lottery.hasOwnProperty('lottery')) delete lottery.lottery;
					await Currencies.setData(i.userID, lottery);
					dac_biet += `\n${name} - Số may mắn: ${i.num} - Tổng giá trị: ${lottery.money}`;
    			} else if (e == "_1") {
					var name = (await Users.getData(i.userID)).name;
					var lottery = await Currencies.getData(i.userID);
					var money = i.money;
					money = money * 50;
					lottery.money = lottery.money + money;
					if (lottery.hasOwnProperty('lottery')) delete lottery.lottery;
					await Currencies.setData(i.userID, lottery);
					giai_nhat += `\n${name} - Số may mắn: ${i.num} - Tổng giá trị: ${lottery.money}`;
    			} else if (e == "_2") {
					var name = (await Users.getData(i.userID)).name;
					var lottery = await Currencies.getData(i.userID);
					var money = i.money;
					money = money * 30;
					lottery.money = lottery.money + money;
					if (lottery.hasOwnProperty('lottery')) delete lottery.lottery;
					await Currencies.setData(i.userID, lottery);
					giai_nhat += `\n${name} - Số may mắn: ${i.num} - Tổng giá trị: ${lottery.money}`;
    			} else if (e == "_3") {
					var name = (await Users.getData(i.userID)).name;
					var lottery = await Currencies.getData(i.userID);
					var money = i.money;
					money = money * 10;
					lottery.money = lottery.money + money;
					if (lottery.hasOwnProperty('lottery')) delete lottery.lottery;
					await Currencies.setData(i.userID, lottery);
					giai_nhat += `\n${name} - Số may mắn: ${i.num} - Tổng giá trị: ${lottery.money}`;
    			}
    		}
    	}
      delete Thread["lottery"];
      await Threads.setData(threadID, { settings: Thread } );	
    	text += dac_biet + giai_nhat + giai_nhi + giai_ba;
    	return out(text);
    }
	return winData(e => getList());
}

module.exports.run = async function({ api, __GLOBAL, client, event, args, models, Users, Threads, Currencies, utils, permssion }) {	
	const moment = require("moment");
	let { threadID, messageID, senderID } = event;
	const out = (msg) => api.sendMessage(msg, threadID, messageID);
	switch (args[0]) {
		case "start":
			var data = (await Threads.getData(threadID)).settings;
			if (!data.hasOwnProperty("lottery")) {
				data["lottery"] = {};
				data["lottery"]["running"] = true;
				data["lottery"]["participants"] = [];
			} else if (data["lottery"]["running"] == true) {
				return out("Nhóm của bạn đã khởi động trò chơi từ trước");
			} else if (data["lottery"]["running"] == false) {
				data["lottery"]["running"] = true;
			}
			await Threads.setData(threadID, { settings: data } );
			client.threadSetting.set(parseInt(threadID), data);
			var date = moment.tz("Asia/Ho_Chi_minh").toISOString();
  			var time = new Date(date.split(":")[0] + "18:30:00.000Z").getTime();
  			client.schedule.push({
		        commandName: this.config.name,
		        timestamp: Math.floor(time / 1000),
		        event
		    })
			return out("Đã khởi động trò chơi nhân phẩm, đặt cược con số may mắn và đợi công bố kết quả vào lúc 18:30");
		break;

		case "bet":
			var thread = (await Threads.getData(threadID)).settings;
			if (!thread.hasOwnProperty("lottery") || !thread["lottery"].hasOwnProperty("running") || thread["lottery"]["running"] == false) {
				return out("Có vẻ như bạn chưa mở trò chơi nhân phầm \'Lô Đề\'");
			}

			var participants = thread["lottery"]["participants"];

			var data = await Currencies.getData(senderID);

			var money = data.money;
			if (!data.hasOwnProperty("lottery")) data["lottery"] = [];
			var number = args[1];
			var coins = args[2];

			if (isNaN(number) || number < 0 || number > 99) {
				return out("Vui lòng chọn 1 con số từ 00 đến 99");
			}
			if (isNaN(coins) || coins.indexOf("-") !== -1 || coins == 0) {
				return out("Tiền đặt cược phải là 1 con số và không âm, khác 0");
			}
			if (coins > money) {
				return out("Hãy kiểm tra lại số tiền bạn có.");
			}

			var betData = data["lottery"];

			number = parseInt(number);
			coins = parseInt(coins);
			if (!betData.some(e => e.number == number)) {
			
        betData.push({
					number,
					coins
				})				
			}
			else {
				return out(`Con số ${number} đã được bạn cược từ trước`);
			}

			if (!participants.includes(senderID)) {
				participants.push(senderID);
			}

			try {
				await Currencies.setData(senderID, data);
				await Threads.setData(threadID, { settings: thread } );			
        await Currencies.decreaseMoney(senderID, coins);
				return out(`Bạn đã cược thành công ${coins} coins cho con số ${number}\nHãy đợi kết quả vào lúc 18:30`);
			}
			catch {
				return out("Đã có lỗi xảy ra. Vui lòng thử lại");
			}			
		break;

		case "list": 
			var thread = (await Threads.getData(threadID)).settings;
			if (!thread.hasOwnProperty("lottery") || !thread["lottery"].hasOwnProperty("running") || thread["lottery"]["running"] == false) {
				return out("Có vẻ như bạn chưa mở trò chơi nhân phầm \'Lô Đề\'");
			}		
			var data = await Currencies.getData(senderID);
			if (!data.hasOwnProperty("lottery")) {
				return out("Bạn chưa đặt cược");
			}
			else {
				var list = "Con số may mắn của bạn là:";
				for (let e of data.lottery) {
					list += `\n${e.number} - ${e.coins} coins`
				}
				return out(list);
			}

		break;

		// case "leave":
		// 	var thread = (await Threads.getData(threadID)).settings;
		// 	if (!thread.hasOwnProperty("lottery") || !thread["lottery"].hasOwnProperty("running") || thread["lottery"]["running"] == false) {
		// 		return out("Có vẻ như bạn chưa mở trò chơi nhân phầm \'Lô Đề\'");
		// 	}		
		// 	var data = await Currencies.getData(senderID);
		// 	if (!data.hasOwnProperty("lottery")) {
		// 		return out("Bạn chưa tham gia.");
		// 	}
		// 	else {
		// 		delete data.lottery;
		// 		await Currencies.setData(senderID, data);
		// 		return out("Bạn đã rời.")
		// 	}		
      // break;
		default:
			return;
			break;
	}
}