module.exports.config = {
	name: "shortaudio",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS mod by banledangyeuu",
	description: "tạo  shortaudio cho 1 tin nhắn",
	commandCategory: "system",
	usages: "shortaudio a => [reply audio/link audio (nếu nhiều link ngăn cách bằng " | ")]",
	cooldowns: 5,
	dependencies: ["fs-extra"]
}

module.exports.onLoad = () => {
	const fs = require("fs-extra");
	if (!fs.existsSync(__dirname + "/cache/shortaudio.json")) fs.writeFileSync(__dirname + "/cache/shortaudio.json", JSON.stringify([]), 'utf-8');
}

module.exports.event =async function({ api, event }) {
	const fs = require("fs-extra"); 
	const axios = require("axios"); 
	if (event.type !== "message_unsend" && event.body.length !== -1) {
		let shortcut = JSON.parse(fs.readFileSync(__dirname + "/cache/shortaudio.json"));
		if (shortcut.some(item => item.id == event.threadID)) {
			let getThread = shortcut.find(item => item.id == event.threadID).shorts;
			if (getThread.some(item => item.in == event.body)) {
				let shortOut = getThread.find(item => item.in == event.body).out;
        if (typeof shortOut == "string") {
          var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
          if (shortOut.indexOf(" | ") !== -1) {
            var arrayOut = shortOut.split(" | ");
            let shortlink = [] 
            for (let link of arrayOut) {
              if (!regex.test(`${link}`)) return api.sendMessage(`Item ${link} không phải là url`, event.threadID);
              shortlink.push(link)
            }			
            //return api.sendMessage(`${shortlink.toString()}`, event.threadID);					
            for (let i = 0; i < shortlink.length; i++) {
            let shortaudio = (await axios.get( `${shortlink[i]}`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync( __dirname + `/cache/shortaudio${i}.m4a`, Buffer.from(shortaudio, "utf-8"));
            api.sendMessage({attachment: fs.createReadStream( __dirname + `/cache/shortaudio${i}.m4a`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shortaudio${i}.m4a`));					
            }
            //return api.sendMessage(`${arrayOut[Math.floor(Math.random() * arrayOut.length)]}`, event.threadID);
          }
          else {
            if (!regex.test(`${shortOut}`)) return api.sendMessage(`Item ${shortOut} không phải là url`, event.threadID);
            let shortaudio = (await axios.get( `${shortOut}`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync( __dirname + `/cache/shortaudio.m4a`, Buffer.from(shortaudio, "utf-8"));
            api.sendMessage({attachment: fs.createReadStream( __dirname + `/cache/shortaudio.m4a`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shortaudio.m4a`));
          }
        }
				else if (typeof shortOut == "object") {
					for (let i = 0; i < shortOut.length; i++) {
					let shortaudio = (await axios.get( `${shortOut[i]}`, { responseType: "arraybuffer" })).data;
					fs.writeFileSync( __dirname + `/cache/shortaudio${i}.m4a`, Buffer.from(shortaudio, "utf-8"));
					api.sendMessage({attachment: fs.createReadStream( __dirname + `/cache/shortaudio${i}.m4a`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shortaudio${i}.m4a`));								
          }}
			}
		}
	}
}

module.exports.run = async function({ api, event, args }) {
	const fs = require("fs-extra");
	var { threadID, messageID } = event;
	var content = args.join(" ");
	//if (!content) return api.sendMessage("Sai Format", threadID, messageID);
	if (content.indexOf(`xóa`) == 0 || content.indexOf(`xoá`) == 0|| content.indexOf(`del`) == 0) {
		let delThis = content.slice(4, content.length);
		if (!delThis) return api.sendMessage("Không tìm thấy shortaudio bạn cần xóa", threadID, messageID);
		return fs.readFile(__dirname + "/cache/shortaudio.json", "utf-8", (err, data) => {
			if (err) throw err;
			var oldData = JSON.parse(data);
			var getThread = oldData.find(item => item.id == threadID).shorts;
			if (!getThread.some(item => item.in == delThis)) return api.sendMessage("Không tìm thấy shortaudio bạn cần xóa", threadID, messageID);
			getThread.splice(getThread.findIndex(item => item.in === delThis), 1);
			fs.writeFile(__dirname + "/cache/shortaudio.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Đã xóa shortaudio thành công!", threadID, messageID));
		});
	}
	else if (content.indexOf(`all`) == 0)
		return fs.readFile(__dirname + "/cache/shortaudio.json", "utf-8", (err, data) => {
			if (err) throw err;
			let allData = JSON.parse(data);
			let msg = '';
			if (!allData.some(item => item.id == threadID)) return api.sendMessage("Hiện tại không có shortaudio nào", threadID, messageID);
			if (allData.some(item => item.id == threadID)) {
				let getThread = allData.find(item => item.id == threadID).shorts;
				getThread.forEach(item => msg = msg + item.in + ' -> ' + (typeof item.out == "object" ? `${item.out.length} Âm thanh` : item.out.indexOf(" | ") !== -1 ? `${item.out.split(" | ").length} Âm thanh` : "1 Âm thanh") + '\n');
			}
			if (!msg) return api.sendMessage("Hiện tại không có shortaudio nào", threadID, messageID);
			api.sendMessage("Sau đây là shortaudio có trong nhóm: \n" + msg, threadID, messageID);
		});
	else if (content.indexOf(`clear`) == 0)
		return fs.readFile(__dirname + "/cache/shortaudio.json", "utf-8", (err, data) => {
			if (err) throw err;
			let allData = JSON.parse(data);
			if (!allData.some(item => item.id == threadID)) return api.sendMessage("Hiện tại không có shortaudio nào", threadID, messageID);
			if (allData.some(item => item.id == threadID)) {
				let getThread = allData.find(item => item.id == threadID).shorts;
				getThread.splice(0, getThread.length)
				return fs.writeFile(__dirname + "/cache/shortaudio.json", JSON.stringify(getThread), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Đã xóa toàn bộ shortaudio" , threadID, messageID));
			}
		});	
  else {
		const https = require("https");
		var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
		var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err))))
		let narrow = content.indexOf(" =>");
		if (narrow == -1) return api.sendMessage("Sai Format", threadID, messageID);
		var shortin = content.slice(0, narrow);
		let shortout = content.slice(narrow + 4, content.length);
		if (shortin == shortout) return api.sendMessage("2 input và output giống nhau", threadID, messageID);
		if (!shortin) return api.sendMessage("Thiếu input", threadID, messageID);
		if (!shortout) {
			if(event.type == "message_reply"&&event.messageReply.attachments[0].type == "audio" ) {
				shortout = [];
				var att = Object.keys(event.messageReply.attachments); 
				for (let i = 0; i < att.length; i++) {
					let link = await short((event.messageReply.attachments[i] != "") ? (event.messageReply.attachments[i].type == "audio") ? event.messageReply.attachments[i].url : "":"");
					shortout.push (link)
				}
			}else return api.sendMessage("Thiếu output", threadID, messageID); 
		}//else return api.sendMessage("Thiếu output", threadID, messageID);
		return fs.readFile(__dirname + "/cache/shortaudio.json", "utf-8", (err, data) => {
			if (err) throw err;
			var oldData = JSON.parse(data);
			if (!oldData.some(item => item.id == threadID)) {
				let addThis = {
					id: threadID,
					shorts: []
				}
				addThis.shorts.push({ in: shortin, out: shortout });
				oldData.push(addThis);
				return fs.writeFile(__dirname + "/cache/shortaudio.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Tạo shortaudio thành công", threadID, messageID));
			}
			else {
				let getShort = oldData.find(item => item.id == threadID);
				if (getShort.shorts.some(item => item.in == shortin)) {
					let index = getShort.shorts.indexOf(getShort.shorts.find(item => item.in == shortin));
					let output = getShort.shorts.find(item => item.in == shortin).out;
					getShort.shorts[index].out = output + " | " + shortout;
					
          return api.sendMessage("shortaudio đã tồn tại trong group này", threadID, messageID);
					
          //return fs.writeFile(__dirname + "/cache/shortimage.json", JSON.stringify(oldData), "utf-8");
				}
				getShort.shorts.push({ in: shortin, out: shortout });
				return fs.writeFile(__dirname + "/cache/shortaudio.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Tạo shortaudio thành công", threadID, messageID));
			}
		});
	}
}