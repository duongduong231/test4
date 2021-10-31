module.exports.config = {
	name: "teamtag",
	version:  "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "tạo teamtag",
	commandCategory: "group",
	usages: "team a => @abc @xyz",
	cooldowns: 5,
	dependencies: ["fs-extra"]
}

module.exports.onLoad = () => {
	const fs = require("fs-extra");
	if (!fs.existsSync(__dirname + "/cache/team.json")) fs.writeFileSync(__dirname + "/cache/team.json", JSON.stringify([]), 'utf-8');
}

module.exports.event = function({ api, event }) {
	const fs = require("fs-extra"); 
  if (event.senderID == api.getCurrentUserID()) return;
	if (event.type !== "message_unsend" && event.body.length !== -1) {
		let team = JSON.parse(fs.readFileSync(__dirname + "/cache/team.json"));
		if (team.some(item => item.id == event.threadID)) {
			let getThread = team.find(item => item.id == event.threadID).team;
			if (getThread.some(item => item.name == event.body)) {
				let shortOut = getThread.find(item => item.name == event.body).members;
				var body = event.body,mentions= [];
				for (let i = 0; i < shortOut.length - 1; i++) {
			  body = "‎" + event.body;
					mentions.push({
						tag: "‎",
						id: shortOut[i],
						fromIndex: i - 1
					});
				}				/*if (shortOut.indexOf(" | ") !== -1) {
					var arrayOut = shortOut.split(" | ");
					return api.sendMessage(`${arrayOut[Math.floor(Math.random() * arrayOut.length)]}`, event.threadID);
				}
				else */
				return api.sendMessage({body:body,mentions}, event.threadID);
			}
		}
	}
}

module.exports.run = function({ api, event, args, Users }) {
	const fs = require("fs-extra");
	var { threadID, messageID } = event;
	var content = args.join(" ");
	if (!content) return api.sendMessage("Sai Format", threadID, messageID);
	if (content.indexOf(`del`) == 0) {
		let delThis = content.slice(4, content.length);
		if (!delThis) return api.sendMessage("Không tìm thấy team bạn cần xóa", threadID, messageID);
		return fs.readFile(__dirname + "/cache/team.json", "utf-8", (err, data) => {
			if (err) throw err;
			var oldData = JSON.parse(data);
			var getThread = oldData.find(item => item.id == threadID).team;
			if (!getThread.some(item => item.name == delThis)) return api.sendMessage("Không tìm thấy team bạn cần xóa", threadID, messageID);
			getThread.splice(getThread.findIndex(item => item.name === delThis), 1);
			fs.writeFile(__dirname + "/cache/team.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Đã xóa team thành công!", threadID, messageID));
		});
	}/*
  else if (content.indexOf(`add`) == 0) {
		let narrow = content.indexOf(" => ");
		if (narrow == -1) return api.sendMessage("Sai Format", threadID, messageID);
    let array = content.split(" => ");
    var count = array[0].split("@").length - 1;
    if (!array[1]) return api.sendMessage("Không tìm thấy team bạn cần thêm thành viên", threadID, messageID);
		let team = JSON.parse(fs.readFileSync(__dirname + "/cache/team.json"));
		if (team.some(item => item.id == event.threadID)) {
			let getThread = team.find(item => item.id == event.threadID).team;
			if (getThread.some(item => item.name == array[1])) {
				let members = getThread.find(item => item.name == array[1]).members;
        //return api.sendMessage(`${count.length - 1}`, threadID, messageID);
       for (let i = 0; i < count; i++) {
        if (array[0].indexOf(`@me`) != -1 ) {
        if (members.find(a => a == event.senderID)) return api.sendMessage("Thành viên đã tồn tại trong team này", threadID, messageID);
        else return members.push(event.senderID,()=>api.sendMessage("Thành viên đã tồn tại trong team này", threadID, messageID));
        } 
        else if (members.find(a => a == Object.keys(event.mentions)[i])) return api.sendMessage("Thành viên đã tồn tại trong team này", threadID, messageID);
        else {
         members.push(Object.keys(event.mentions)[i])
         return api.sendMessage(`Đã thêm ${Object.keys(event.mentions)[i]} vào team`, threadID, messageID);
       }
       }
        }
      }
  }*/
	else if (content.indexOf(`all`) == 0)
		return fs.readFile(__dirname + "/cache/team.json", "utf-8", (err, data) => {
			if (err) throw err;
			let allData = JSON.parse(data);
			let msg = '';
			if (!allData.some(item => item.id == threadID)) return api.sendMessage("Hiện tại không có team nào", threadID, messageID);
			if (allData.some(item => item.id == threadID)) {
        var name = [];
				let getThread = allData.find(item => item.id == threadID).team;
				getThread.forEach(item => msg = msg + item.name + ' -> ' + item.members + '\n');
			}
			if (!msg) return api.sendMessage("Hiện tại không có team nào", threadID, messageID);
			api.sendMessage("Sau đây là team có trong nhóm: \n" + msg, threadID, messageID);
		});
	else {
		let narrow = content.indexOf(" => ");
		if (narrow == -1) return api.sendMessage("Sai Format", threadID, messageID);
		let shortin = content.slice(0, narrow);
    let shortout = [];
    if (content.indexOf(`@me`) != -1) shortout.push(event.senderID);  	
    var count = content.split(`@`);
    for (let i = 0; i < count.length - 1; i++) {
    if (Object.keys(event.mentions)[i]) shortout.push(Object.keys(event.mentions)[i]);	
		}
    if (shortin == shortout) return api.sendMessage("2 input và output giống nhau", threadID, messageID);
		if (!shortin) return api.sendMessage("Thiếu input", threadID, messageID);
		if (!shortout) return api.sendMessage("Thiếu output", threadID, messageID);
		return fs.readFile(__dirname + "/cache/team.json", "utf-8", (err, data) => {
			if (err) throw err;
			var oldData = JSON.parse(data);
			if (!oldData.some(item => item.id == threadID)) {
				let addThis = {
					id: threadID,
					team: []
				}
				addThis.team.push({ name: shortin, members: shortout });
				oldData.push(addThis);
				return fs.writeFile(__dirname + "/cache/team.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Tạo team thành công", threadID, messageID));
			}
			else {
				let getShort = oldData.find(item => item.id == threadID);
				if (getShort.team.some(item => item.name == shortin)) {
					let index = getShort.team.indexOf(getShort.team.find(item => item.name == shortin));
					let output = getShort.team.find(item => item.name == shortin).out;
					getShort.team[index].out = output + " | " + shortout;
					api.sendMessage("team đã tồn tại trong group này", threadID, messageID);
					return fs.writeFile(__dirname + "/cache/team.json", JSON.stringify(oldData), "utf-8");
				}
				getShort.team.push({ name: shortin, members: shortout });
				return fs.writeFile(__dirname + "/cache/team.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Tạo team thành công", threadID, messageID));
			}
		});
	}
}

