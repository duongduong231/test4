module.exports = function({ api, client, __GLOBAL, models, timeStart }) {
	const Users = require("./controllers/users")({ models, api }),
				Threads = require("./controllers/threads")({ models, api }),
				Currencies = require("./controllers/currencies")({ models });
	const logger = require("../utils/log.js");

	//////////////////////////////////////////////////////////////////////
	//========= Push all variable from database to environment =========//
	//////////////////////////////////////////////////////////////////////
	
	(async() => {
		try {
			logger("Khởi tạo biến môi trường", "[ DATABASE ]")
			const threads = (await Threads.getAll());
			const users = (await Users.getAll(["userID", "banned"]));

			for (const info of threads) {
				client.allThread.push(info.threadID);
				client.threadSetting.set(info.threadID.toString(), info.settings || {});
				client.threadInfo.set(info.threadID.toString(), info.threadInfo || {});
				if (info.banned == 1) client.threadBanned.set(info.threadID.toString(), 1);
				
			}
			logger.loader("Đã tải xong biến môi trường nhóm!");
			for (const info of users) {
				client.allUser.push(info.userID);
				if (info.banned == 1) client.userBanned.set(info.userID.toString(), 1); 
			}
			logger.loader("Đã tải xong biến môi trường người dùng!");
			logger("Khởi tạo biến môi trường thành công!", "[ DATABASE ]");
		}
		catch (error) {
			return logger.loader("Khởi tạo biến môi trường không thành công, Lỗi: " + error, "error");
		}
	})();

	logger(`${api.getCurrentUserID()} - [ ${__GLOBAL.settings.PREFIX} ] • ${(!__GLOBAL.settings.BOTNAME) ? "This bot was made by CatalizCS and SpermLord" : __GLOBAL.settings.BOTNAME}`, "[ UID ]");
	
	///////////////////////////////////////////////
	//========= Require all handle need =========//
	//////////////////////////////////////////////

	require("./handle/handleSchedule")({ api, __GLOBAL, client, models, Users, Threads, Currencies });
	const utils = require("../utils/funcs.js")({ api, __GLOBAL, client });
	const handleCommand = require("./handle/handleCommand")({ api, __GLOBAL, client, models, Users, Threads, Currencies, utils });
	const handleCommandEvent = require("./handle/handleCommandEvent")({ api, __GLOBAL, client, models, Users, Threads, Currencies, utils });
	const handleReply = require("./handle/handleReply")({ api, __GLOBAL, client, models, Users, Threads, Currencies });
	const handleReaction = require("./handle/handleReaction")({ api, __GLOBAL, client, models, Users, Threads, Currencies });
	const handleEvent = require("./handle/handleEvent")({ api, __GLOBAL, client, models, Users, Threads, Currencies });
	const handleCreateDatabase = require("./handle/handleCreateDatabase")({ __GLOBAL, api, Threads, Users, Currencies, models, client });

	logger.loader(`====== ${Date.now() - timeStart}ms ======`);

	//////////////////////////////////////////////////
	//========= Send event to handle need =========//
	/////////////////////////////////////////////////

	return (event) => {
		switch (event.type) {
			case "message":
			case "message_reply":
			case "message_unsend":
				handleCommand({ event })
				handleReply({ event })
				handleCommandEvent({ event })
				handleCreateDatabase({ event })
				break;
			case "event":
				handleEvent({ event })
				break;
			case "message_reaction":
				handleReaction({ event })
				break;
			default:
				break;
		}
	}
}

//THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯