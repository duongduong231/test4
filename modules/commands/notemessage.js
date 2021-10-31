module.exports.config = {
	name: "note",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "tạo note cho 1 tin nhắn",
	commandCategory: "system",
	usages: "note a => reply tin nhắn",
	cooldowns: 5,
	dependencies: ["fs-extra"]
}

module.exports.onLoad = () => {
	const fs = require("fs-extra");
	if (!fs.existsSync(__dirname + "/cache/note.json")) fs.writeFileSync(__dirname + "/cache/note.json", JSON.stringify([]), 'utf-8');
}

module.exports.event =async function({ api, event }) {
	const fs = require("fs-extra"); 
	if (event.type !== "message_unsend" && event.body.length !== -1) {
		let shortcut = JSON.parse(fs.readFileSync(__dirname + "/cache/note.json"));
		if (shortcut.some(item => item.id == event.threadID)) {
			let getThread = shortcut.find(item => item.id == event.threadID).shorts;
			if (getThread.some(item => item.in == event.body)) {
				let shortOut = getThread.find(item => item.in == event.body).out;
				return api.sendMessage(`.`,event.threadID, shortOut);
			}
		}
	}
}

module.exports.run = function({ api, event, args }) {
	const fs = require("fs-extra");
	var { threadID, messageID } = event;
	var content = args.join(" ");
	if (!content) return fs.readFile(__dirname + "/cache/note.json", "utf-8", (err, data) => {
			if (err) throw err;
			let allData = JSON.parse(data);
			let msg = '';
			if (!allData.some(item => item.id == threadID)) return api.sendMessage("Hiện tại không có note nào", threadID, messageID);
			if (allData.some(item => item.id == threadID)) {
				let getThread = allData.find(item => item.id == threadID).shorts;
				getThread.forEach(item => msg = msg + item.in + ' -> 1 tin nhắn \n');
			}
			if (!msg) return api.sendMessage("Hiện tại không có note nào", threadID, messageID);
			api.sendMessage("Sau đây là note có trong nhóm: " + msg, threadID, messageID);
		});
	if (content.indexOf(`xóa`) == 0 || content.indexOf(`xoá`) == 0|| content.indexOf(`del`) == 0) {
		let delThis = content.slice(4, content.length);
		if (!delThis) return api.sendMessage("Không tìm thấy note bạn cần xóa", threadID, messageID);
		return fs.readFile(__dirname + "/cache/note.json", "utf-8", (err, data) => {
			if (err) throw err;
			var oldData = JSON.parse(data);
			var getThread = oldData.find(item => item.id == threadID).shorts;
			if (!getThread.some(item => item.in == delThis)) return api.sendMessage("Không tìm thấy note bạn cần xóa", threadID, messageID);
			getThread.splice(getThread.findIndex(item => item.in === delThis), 1);
			fs.writeFile(__dirname + "/cache/note.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Đã xóa shortcut thành công!", threadID, messageID));
		});
	}
	else if (content.indexOf(`all`) == 0)
		return fs.readFile(__dirname + "/cache/note.json", "utf-8", (err, data) => {
			if (err) throw err;
			let allData = JSON.parse(data);
			let msg = '';
			if (!allData.some(item => item.id == threadID)) return api.sendMessage("Hiện tại không có note nào", threadID, messageID);
			if (allData.some(item => item.id == threadID)) {
				let getThread = allData.find(item => item.id == threadID).shorts;
				getThread.forEach(item => msg = msg + item.in + ' -> 1 tin nhắn \n');
			}
			if (!msg) return api.sendMessage("Hiện tại không có note nào", threadID, messageID);
			api.sendMessage("Sau đây là note có trong nhóm: " + msg, threadID, messageID);
		});
	else if (content.indexOf(`clear`) == 0)
		return fs.readFile(__dirname + "/cache/note.json", "utf-8", (err, data) => {
			if (err) throw err;
			let allData = JSON.parse(data);
			if (!allData.some(item => item.id == threadID)) return api.sendMessage("Hiện tại không có note nào", threadID, messageID);
			if (allData.some(item => item.id == threadID)) {
				let getThread = allData.find(item => item.id == threadID).shorts;
				getThread.splice(0, getThread.length)
				return fs.writeFile(__dirname + "/cache/note.json", JSON.stringify(getThread), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Đã xóa toàn bộ note" , threadID, messageID));
			}
		});	
  else {
		let shortin = args.join(" ");
		if (!shortin) return api.sendMessage("Thiếu input", threadID, messageID);
    if (event.type !== "message_reply") return api.sendMessage("Thiếu output, hãy reply tin cần note", threadID, messageID);
		return fs.readFile(__dirname + "/cache/note.json", "utf-8", (err, data) => {
			if (err) throw err;
			var oldData = JSON.parse(data);
			if (!oldData.some(item => item.id == threadID)) {
				let addThis = {
					id: threadID,
					shorts: []
				}
				addThis.shorts.push({ in: "#"+shortin, out: event.messageReply.messageID });
				oldData.push(addThis);
				return fs.writeFile(__dirname + "/cache/note.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Tạo note thành công", threadID, messageID));
			}
			else {
				let getShort = oldData.find(item => item.id == threadID);
				if (getShort.shorts.some(item => item.in == shortin)) {
					let index = getShort.shorts.indexOf(getShort.shorts.find(item => item.in == shortin));
					let output = getShort.shorts.find(item => item.in == shortin).out;
					api.sendMessage("Note đã tồn tại trong group này", threadID, messageID);
					return fs.writeFile(__dirname + "/cache/note.json", JSON.stringify(oldData), "utf-8");
				}
				getShort.shorts.push({ in: "#"+shortin, out: event.messageReply.messageID });
				return fs.writeFile(__dirname + "/cache/note.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Tạo note thành công", threadID, messageID));
			}
		});
	}
}
