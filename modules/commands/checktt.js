module.exports.config = {
	name: "checktt",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "dik",
	commandCategory: "group",
	usages: "checktt args",
	cooldowns: 5,
	info: [
		{
			key: 'args => all',
			prompt: 'Kiểm tra lượt tương tác của toàn bộ thành viên',
			type: 'String',
			example: ''
		},
        {
            key: "args => Tag một người nào đó!",
            prompt: "Kiểm tra lượt tương tác người bạn tag",
            type: "Mention",
            example: "@MiraiBot"
        },
        {
            key: "args => del + [số tin nhắn]",
            prompt: "Lọc thành viên khỏi nhóm theo số tin nhắn",
            type: "Number",
            example: "1"
        },
        {
            key: "args => checkpoint",
            prompt: "Lọc thành viên bị bay acc khỏi nhóm",
            type: "",
            example: ""
        },
    {
            key: "args => để trống",
            prompt: "Kiểm tra lượt tương tác của bản thân",
            type: "AIR",
            example: ""
        }
	],
    envConfig: {
        "maxColumn": 10
    }
};

module.exports.run = async ({ args, api, event, Currencies, client }) => {
    var mention = Object.keys(event.mentions);
    const data = await api.getThreadInfo(event.threadID);
    if (args[0] == "checkpoint") {
    const find = data.adminIDs.find(el => el.id == event.senderID && api.getCurrentUserID());
    if (!find) return api.sendMessage(`Bạn và bot cần là quản trị viên!`,event.threadID);
      let storage = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "gender": value.gender});
        for (const user of storage) {
            if (user.gender == undefined) api.removeUserFromGroup(user.id,event.threadID)
        }return;
    }  else if (args[0] == "del") {
    const find = data.adminIDs.find(el => el.id == event.senderID && api.getCurrentUserID());
    if (!find) return api.sendMessage(`Bạn và bot cần là quản trị viên!`,event.threadID);
    if (!args[1]) return api.sendMessage(`Cần ghi số tin nhắn duyệt!`,event.threadID);
      let storage = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = (await Currencies.getData(user.id)).exp;
            if (typeof countMess == "undefined") await Currencies.setEXP(mention, parseInt(0))
           // if (countMess ==  undefined) api.removeUserFromGroup(user.id,event.threadID)
            if (countMess <= args[1]) setTimeout(function() { api.removeUserFromGroup(user.id,event.threadID) }, 2000);
        } return;
    } else if (args[0] == "all") {
        let number = 0, msg = "", storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            if (user.name != null) exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
        });
        for (const lastData of exp) {
            number++;
            msg += `${number}. ${(lastData.name) == null || undefined  ? "Không tên" : lastData.name} với ${lastData.exp} tin nhắn \n`;
        }
        return api.sendMessage("Top người dùng tương tác kinh nhất nhóm\n"+msg, event.threadID);
    } else if (mention[0]) {
        let storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});

        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            if (a.id > b.id) return 1;
		    if (a.id < b.id) return -1;
        });
        //console.log(JSON.stringify(exp, null, 4))
        let rank = exp.findIndex(info => parseInt(info.uid) == parseInt(mention[0])) + 1;
        let infoUser = exp[rank - 1];
        return api.sendMessage(`${infoUser.name} đứng hạng ${rank} với ${infoUser.exp} tin nhắn`, event.threadID);
    }
    else {
        let storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            if (a.id > b.id) return 1;
		    if (a.id < b.id) return -1;
        });
        let rank = exp.findIndex(info => parseInt(info.uid) == parseInt(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`)) + 1;
        let infoUser = exp[rank - 1];
        return api.sendMessage(`${(event.type == "message_reply") ? event.messageReply.senderID : "Bạn"}`+` đứng hạng ${rank} với ${infoUser.exp} tin nhắn`, event.threadID,event.messageID);
    }
}