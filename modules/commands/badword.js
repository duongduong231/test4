module.exports.config = {
	name: "badword",
	version: "2.7.1",
	hasPermssion: 0,
	credits: "",
	description: "Cảnh cáo thành viên khi vi phạm luật, quá 3 lần sẽ bị ban vĩnh viễn khỏi nhóm",
	commandCategory: "group (QTV)",
	usages: "[key]",
	cooldowns: 0,
	info: [
		{
			key: 'rỗng',
			prompt: 'kiểm tra số lần bị cảnh cảo của bản thân',
			type: '',
			example: 'warn'
  	},
    {
			key: '[tag/reply tin nhắn] "lý do"',
			prompt: 'thêm 1 lần cảnh cáo thành viên',
			type: '',
			example: 'warn [tag] "lý do"'
  	},
		{
			key: 'free',
			prompt: 'xóa user khỏi danh sách bị warn',
			type: '',
			example: 'warn free [id của user cần xóa]'
  		},
		{
			key: 'view',
			prompt: '"tag" hoặc "để trống" hoặc "view all", lần lượt dùng để xem người được tag hoặc bản thân hoặc thành viên trong box bị cảnh cáo bao nhiêu lần ',
			type: '',
			example: 'warn view [@tag] / warns view'
  		},

		{
			key: 'reset',
			prompt: 'Reset toàn bộ dữ liệu warn trong nhóm của bạn',
			type: '',
			example: 'warn reset'
  		}
  ]
};
module.exports.event = async ({ event, api, client, Threads }) => {
	let {messageID, threadID, senderID} = event;
  if (senderID == api.getCurrentUserID()) return;
	var fs = require("fs-extra");
  	if (!fs.existsSync(__dirname + `/cache/badword.json`)) {
			const dataaa = {words: {}, info: {}, banned: {}};
			fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(dataaa));
	}
  var badword = JSON.parse(fs.readFileSync(__dirname + `/cache/badword.json`)); 
  if(!badword.words.hasOwnProperty(threadID)) {
			badword.words[threadID] = []; 
			badword.info[threadID] = {}; 
			badword.banned[threadID] = []; 
			fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));  	
  }
  if (typeof badword.words[threadID] == "null") return;
  
  let bws = badword.words[threadID];
  let info = badword.info[threadID];
  if (!info[senderID]) {
    info[senderID] = {};
      info[senderID].badword = [];
      info[senderID].history = [];
      for (let bw of bws) {
      if (event.body.toLowerCase().indexOf(bw.toLowerCase()) != -1) {
        info[senderID].history.push(event.body);
        info[senderID].badword.push(bw);
        api.sendMessage({body: `Bạn đã gửi tin nhắn với 1 badword nên bị cảnh cảo, bạn còn ${7 - info[senderID].badword.length} mạng`}, threadID, messageID);
      }
    }
  }
  else {  
    for (let bw of bws) {
      if (event.body.toLowerCase().indexOf(bw.toLowerCase()) != -1) {
        badword.info[threadID][senderID].history.push(event.body);
        badword.info[threadID][senderID].badword.push(bw);
        api.sendMessage({body: `Bạn đã gửi tin nhắn với 1 badword nên bị cảnh cảo, bạn còn ${7 - info[senderID].badword.length} mạng`}, threadID, messageID);
      }
    }
  } 
  if (info[senderID].badword.length > 7) {
    api.sendMessage({body: `Bạn đã bị cảnh cáo đủ 7 lần và sẽ bị cầm khỏi nhóm`}, threadID, messageID);
    api.removeUserFromGroup(parseInt(senderID), threadID)
    badword.banned[threadID].push(senderID);
  }
  return fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));
}

module.exports.run = async function({ api, args, Users, event, Threads, utils, client ,__GLOBAL}) {
	let {messageID, threadID, senderID} = event;
	var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('Bot cần quyền quản trị viên nhóm để sử dụng lệnh này\nVui lòng thêm và thử lại!', threadID, messageID);
	var fs = require("fs-extra");
	
	if (!fs.existsSync(__dirname + `/cache/badword.json`)) {
			const dataaa = {words: {}, info: {}, banned: {}};
			fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(dataaa));
	}
  var badword = JSON.parse(fs.readFileSync(__dirname + `/cache/badword.json`)); 
  if(!badword.words.hasOwnProperty(threadID)) {
			badword.words[threadID] = []; 
			badword.info[threadID] = {}; 
			badword.banned[threadID] = []; 
			fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));  	
  }
  if (!badword.info[threadID].hasOwnProperty(senderID)) {
      badword.info[threadID][senderID] = {};
      badword.info[threadID][senderID].badword = [];
      badword.info[threadID][senderID].history = [];
  }
  if(args[0] == "add") {
    let words = args.join(" ").slice(4).split(' ')
    for (let word of words) {
      if (badword.words[threadID].includes(word)) return;
      badword.words[threadID].push(word);
    }  
    api.sendMessage({body: `Đã thêm badword cho nhóm, mỗi lần cách sẽ được tính là 1 badword`}, threadID, messageID);
    return fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));
  }
  if(args[0] == "list") {
    let words = badword.words[threadID];
    if (words.length < 1) return api.sendMessage({body: `Nhóm bạn chưa thêm từ cấm`}, threadID, messageID);
    return api.sendMessage({body: `Đây là danh sách badword của nhóm: ` + words.join(", ")}, threadID, messageID);
  } 
  if(args[0] == "del") {
    if (args[1] == "all") {
      badword.words[threadID] = []
    api.sendMessage({body: `Đã xóa toàn bộ badword`}, threadID, messageID);
    return fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));
    } 
    let words = args.join(" ").slice(4).split(' ')
    for (let word of words) {
      if (badword.words[threadID].includes(word)) return;
      badword.words[threadID].slice(badword.words[threadID].indexOf(word));
    }  
    api.sendMessage({body: `Đã xóa badword cho nhóm, mỗi lần cách sẽ được tính là 1 badword`}, threadID, messageID);
    return fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));
  }  else if(args[0] == "free") {
	  var info = await api.getThreadInfo(threadID);
	  if (!info.adminIDs.some(item => item.id == senderID)) return api.sendMessage('❎Chỉ qtv nhóm mới có thể sử dụng lệnh free!', threadID, messageID);
    if(Object.keys(event.mentions).length != 0) {
  		var mentions = Object.keys(event.mentions);
  		for(let id of mentions) {
  	    var mybox = badword.info[threadID][id];
  	    if(!mybox) return api.sendMessage("✅Người này chưa bị cảnh cáo badword", threadID, messageID);
			  api.sendMessage(`✅Đã xóa cảnh cáo badword cho thành viên có id ${id}`, threadID, messageID);
			  //mybox.splice(mybox.indexOf(id), mybox.length);
        badword.info[threadID][id].badword = [];
        badword.info[threadID][id].history = [];
        badword.banned[threadID].slice(badword.banned[threadID].indexOf(id),1)
        return fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));
  		}
  		return api.sendMessage(message, threadID, messageID);
  	} else {  	
      var id = parseInt(args[1]), mybox = badword.warns[threadID][id];
  	  var info = await api.getThreadInfo(threadID);
  	  if(!id) return api.sendMessage("❎Cần nhập id người cần xóa khỏi danh sách bị warn", threadID, messageID);
  	  else if(!mybox) return api.sendMessage("✅Người này chưa bị warn", threadID, messageID);
			api.sendMessage(`✅Đã xóa warn cho thành viên có id ${id}`, threadID, messageID);
      //mybox.splice(mybox.indexOf(id), mybox.length);
        badword.info[threadID][id].badword = [];
        badword.info[threadID][id].history = [];
      badword.banned[threadID].slice(badword.banned[threadID].indexOf(id),1)
			return fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));
    }
  }
  else if(args[0] == "reset") {
  	var info = await api.getThreadInfo(threadID);
	  if (!info.adminIDs.some(item => item.id == senderID)) return api.sendMessage('❎Chỉ qtv nhóm mới có thể sử dụng lệnh reset!', threadID, messageID);
  	badword.info[threadID] = []
  	badword.words[threadID] = []
  	badword.banned[threadID] = []
  	fs.writeFileSync(__dirname + `/cache/badword.json`, JSON.stringify(badword, null, 2));
  	return api.sendMessage("Đã reset toàn bộ dữ liệu warn trong nhóm của bạn", threadID, messageID);
  }
  else if(args[0] == "test") {
  var bw = badword.info[threadID][100072833154815];
  return api.sendMessage(`${JSON.stringify(bw.history)}`, threadID, messageID);
  }
  else if(args[0] == "view") {
    var mention = Object.keys(event.mentions)[0];
    if (event.type !== "message_reply") {
    if (!mention) { 	
      if(!args[1]) {
  		var msg = "";
  			var bw = badword.info[threadID][senderID];
  			if(!bw || bw.badword.length < 1) return api.sendMessage(`Bạn chưa bị cảnh cáo lần nào`, threadID, messageID);
        for (let i = 0; i < bw.badword.length; i++) {
        msg += i+1 + `. ${badword.info[threadID][senderID].history[i].toLowerCase().replace(bw.badword[i].toLowerCase(),`<`+bw.badword[i].toLowerCase()+`>`)}\n`;
        }
  		return api.sendMessage(`❎Bạn đã bị cảnh cáo với lý do : \n${msg}`, threadID, messageID);
  	}
    else if(args[1] == "all") {
  		var bw = badword.info[threadID];
  		var allwarn = "";
      
  		for(let id in bw) {
        if (bw[id].badword.length < 1) { continue; }
  			var name = (await api.getUserInfo(id))[id].name, msg = "";
  			allwarn += `- ${name}/${id}: ${bw[id].badword.length} lần cảnh cáo\n`;
  		}

  		(allwarn == "" || allwarn.length < 1)? api.sendMessage("✅ Nhóm bạn chưa có ai bị cảnh cáo", threadID, messageID) : api.sendMessage("Danh sách những thành viên đã bị cảnh cáo:\n"+allwarn, threadID, messageID);
  	}
    else {
  		var message = "";
  			var name = (await api.getUserInfo(args[1]))[args[1]].name;
  			var msg = "";
  			var so = 1;
  			var bw = badword.info[threadID][args[1]];
  			if(!bw || bw.badword.length < 1) return api.sendMessage(`Bạn chưa bị cảnh cáo lần nào`, threadID, messageID);
        for (let i = 0; i < bw.length; i++) {
        msg += i+1 + `. ${bw.history[i].toLowerCase().replace(bw.badword[i].toLowerCase(),`<`+bw.badword[i].toLowerCase()+`>`)}\n`;
        }
  			message += `- ${name}/${args[1]}:\n ${msg}\n`;
  		return api.sendMessage(message, threadID, messageID);
  	}
    }
  	else if(Object.keys(event.mentions).length != 0) {
  		var message = "";
  		var mentions = Object.keys(event.mentions);
  		for(let id of mentions) {
  			var name = (await api.getUserInfo(id))[id].name;
  			var msg = "";
  			var so = 1;
  			var bw = badword.info[threadID][id];
  			if(!bw || bw.badword.length < 1) return api.sendMessage(`Bạn chưa bị cảnh cáo lần nào`, threadID, messageID);
        for (let i = 0; i < bw.badword.length; i++) {
        msg += i+1 + `. ${bw.history[i].toLowerCase().replace(bw.badword[i].toLowerCase(),`<`+bw.badword[i].toLowerCase()+`>`)}\n`;
  			}
  			message += `- ${name}/${id}:\n ${msg}\n`;
  		}
  		return api.sendMessage(message, threadID, messageID);
  	}
    }
    else {
      var msg = "";
  		var bw = badword.info[threadID][event.messageReply.senderID];
  			if(!bw || bw.badword.length < 1) return api.sendMessage(`Bạn chưa bị cảnh cáo lần nào`, threadID, messageID);
        for (let i = 0; i < bw.badword.length; i++) {
        msg += i+1 + `. ${bw.history[i].toLowerCase().replace(bw.badword[i].toLowerCase(),`<`+bw.badword[i].toLowerCase()+`>`)}\n`;
        }
  		return api.sendMessage(`❎ ` + event.messageReply.senderID +` đã bị cảnh cáo với lý do : \n${msg}`, threadID, messageID);
    }
  }
  else{ 
    
    /*
    if (event.type != "message_reply" && Object.keys(event.mentions).length == 0) {
        var msg = "";
        var mywarn = bans.warns[threadID][senderID];
        if(!mywarn) return api.sendMessage('✅Bạn chưa bị cảnh cáo lần nào', threadID, messageID);
        var num = 1;
        for(let reasonwarn of mywarn) {
          msg += `${reasonwarn}\n`;
        }
        return api.sendMessage(`❎Bạn đã bị cảnh cáo với lý do : ${msg}`, threadID, messageID);
    } /*else if (event.type == "message_reply" && !args[0]){
        var msg = "";
        var mywarn = bans.warns[threadID][event.messageReply.senderID];
        if(!mywarn) return api.sendMessage(`✅ ${event.messageReply.senderID} chưa bị cảnh cáo lần nào`, threadID, messageID);
        var num = 1;
        for(let reasonwarn of mywarn) {
          msg += `reasonwarn\n`;
        }
        return api.sendMessage(`❎ ${event.messageReply.senderID} đã bị cảnh cáo với lý do : ${msg}`, threadID, messageID);
    }	return utils.throwError(this.config.name, threadID, messageID);
    var info = await api.getThreadInfo(threadID);
    if (!info.adminIDs.some(item => item.id == senderID)) return api.sendMessage('Chỉ qtv nhóm mới có thể cảnh cáo thành viên!', threadID, messageID);
    var reason = "";
    if (event.type == "message_reply") {
      var iduser = [];
          iduser.push(event.messageReply.senderID);
          reason = (args.join(" ")).trim();
    }
    else if (Object.keys(event.mentions).length != 0) {
      var iduser = Object.keys(event.mentions);
      var stringname = "";
      var nametaglength = (Object.values(event.mentions)).length;
      var namearr = Object.values(event.mentions);
      for(let i = 0; i < nametaglength; i++) {
        stringname += (Object.values(event.mentions))[i];
      }
      var message = args.join(" "), vitrivalue = "";
      for(let valuemention of namearr) {
        console.log("WARN",valuemention, (!reason) ? "Không có lý do nào được đưa ra": message.replace(/\s+/g, ' ').replace(namearr,""));
        //console.log(message);
        vitrivalue = message.indexOf(valuemention);
        //console.log(vitrivalue);
        message = message.replace(valuemention,"");
      }
      var reason = message.replace(/\s+/g, ' ');
    }
    var arraytag = [];
    var arrayname = [];
    for(let iid of iduser) {
      var id = parseInt(iid);
      var nametag = (await api.getUserInfo(id))[id].name;
      arraytag.push({id: id, tag: nametag});

      if(!reason) reason += "Không có lý do nào được đưa ra";
      var dtwmybox = bans.warns[threadID];
      if(!dtwmybox.hasOwnProperty(id)) dtwmybox[id] = [];
      arrayname.push(nametag);
      var pushreason = bans.warns[threadID][id];
      pushreason.push(reason);
      if(!bans.banned[threadID]) bans.banned[threadID] = [];
      
      if((bans.warns[threadID][id]).length > 2) {
      var dtwmybox = bans.reasonBan[threadID];
      if(!dtwmybox.hasOwnProperty(id)) dtwmybox[id] = [];
        var pushreason = bans.reasonBan[threadID][id];
        msg = "Đủ 3 lần warn"
        pushreason.push(msg);
        api.removeUserFromGroup(parseInt(id), threadID)
        if(!bans.banned[threadID]) bans.banned[threadID] = []
        bans.banned[threadID].push(id);
        api.removeUserFromGroup(parseInt(id), threadID)
        api.sendMessage({body: `Đã ban thành viên ${arrayname.join(", ")} với lý do: đủ 3 lần warn`, mentions: arraytag}, threadID, messageID);
        fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
      }
    }
    api.sendMessage({body: `Đã warn thành viên ${arrayname.join(", ")} với lý do: ${reason}`, mentions: arraytag}, threadID, messageID);
    return fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
    
    */
  }
};