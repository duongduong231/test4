module.exports.config = {
	name: "warn",
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

module.exports.run = async function({ api, args, Users, event, Threads, utils, client ,__GLOBAL}) {
	let {messageID, threadID, senderID} = event;
	var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('Bot cần quyền quản trị viên nhóm để sử dụng lệnh này\nVui lòng thêm và thử lại!', threadID, messageID);
	var fs = require("fs-extra");
	
	if (!fs.existsSync(__dirname + `/cache/bans.json`)) {
			const dataaa = {warns: {}, reasonBan: {}, banned: {}};
			fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(dataaa));
	}
  var bans = JSON.parse(fs.readFileSync(__dirname + `/cache/bans.json`)); 
  if(!bans.warns.hasOwnProperty(threadID)) {
			bans.warns[threadID] = {}; 
			bans.reasonBan[threadID] = {}; 
			fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  	
  }
  if(args[0] == "free") {
	  var info = await api.getThreadInfo(threadID);
	  if (!info.adminIDs.some(item => item.id == senderID)) return api.sendMessage('❎Chỉ qtv nhóm mới có thể sử dụng lệnh unban!', threadID, messageID);
    if(Object.keys(event.mentions).length != 0) {
  		var mentions = Object.keys(event.mentions);
  		for(let id of mentions) {
  	    var mybox = bans.warns[threadID][id];
  	    if(!mybox) return api.sendMessage("✅Người này chưa bị warn", threadID, messageID);
			  api.sendMessage(`✅Đã xóa warn cho thành viên có id ${id}`, threadID, messageID);
			  //mybox.splice(mybox.indexOf(id), mybox.length);
			  delete bans.warns[threadID][id] 
			  return fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  		}
  		return api.sendMessage(message, threadID, messageID);
  	}else {  	
      var id = parseInt(args[1]), mybox = bans.warns[threadID][id];
  	  var info = await api.getThreadInfo(threadID);
  	  if(!id) return api.sendMessage("❎Cần nhập id người cần xóa khỏi danh sách bị warn", threadID, messageID);
  	  else if(!mybox) return api.sendMessage("✅Người này chưa bị warn", threadID, messageID);
			api.sendMessage(`✅Đã xóa warn cho thành viên có id ${id}`, threadID, messageID);
      //mybox.splice(mybox.indexOf(id), mybox.length);
			delete bans.warns[threadID][id]
			return fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
    }
  }
  else if(args[0] == "reset") {
  	var info = await api.getThreadInfo(threadID);
	  if (!info.adminIDs.some(item => item.id == senderID)) return api.sendMessage('❎Chỉ qtv nhóm mới có thể sử dụng lệnh reset!', threadID, messageID);
  	bans.warns[threadID] = {};
  	fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  	return api.sendMessage("Đã reset toàn bộ dữ liệu warn trong nhóm của bạn", threadID, messageID);
  }
  else if(args[0] == "view") {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) {  	
      if(!args[1]) {
  		var msg = "";
  		var mywarn = bans.warns[threadID][senderID];
  		if(!mywarn) return api.sendMessage('✅Bạn chưa bị cảnh cáo lần nào', threadID, messageID);
  		var num = 1;
  		for(let reasonwarn of mywarn) {
  			msg += `${reasonwarn}\n`;
  		}
  		return api.sendMessage(`❎Bạn đã bị cảnh cáo với lý do : ${msg}`, threadID, messageID);
  	}
    else if(args[1] == "all") {
  		var dtwbox = bans.warns[threadID];
  		var allwarn = "";
  		for(let idtvw in dtwbox) {
  			var name = (await api.getUserInfo(idtvw))[idtvw].name, msg = "", solan = 1;
       // let i = 1;
  			
        //for(let reasonwtv of dtwbox[idtvw]) {
  				
          ////msg +="\n"+ i + `. ${reasonwtv}`
         // i ++
  			
        //}
  			allwarn += `- ${name}/${idtvw}: ${dtwbox[idtvw].length} lần cảnh cáo\n`;
  		}
  		allwarn == "" ? api.sendMessage("✅ Nhóm bạn chưa có ai bị cảnh cáo", threadID, messageID) : api.sendMessage("Danh sách những thành viên đã bị cảnh cáo:\n"+allwarn, threadID, messageID);
  	}
    else {
  		var message = "";
  			var name = (await api.getUserInfo(args[1]))[args[1]].name;
  			var msg = "";
  			var so = 1;
  			var reasonarr = bans.warns[threadID][args[1]];
  			if(typeof reasonarr != "object") {
  				msg += " Chưa bị cảnh cáo lần nào\n"
  			} else {
        let i = 1;
  			for(let reasonwarn of reasonarr) {
  			  msg += i + `. ${reasonwarn}\n`;
          i++
  			}
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
  			var reasonarr = bans.warns[threadID][id];
  			if(typeof reasonarr != "object") {
  				msg += " Chưa bị cảnh cáo lần nào\n"
  			} else {
        let i = 1;
  			for(let reasonwarn of reasonarr) {
  			  msg += i + `.${reasonwarn}\n`;
          i++
  			}
  			}
  			message += `- ${name}/${id}:\n ${msg}\n`;
  		}
  		return api.sendMessage(message, threadID, messageID);
  	}
    else {
      var msg = "";
  		var mywarn = bans.warns[threadID][event.messageReply.senderID];
  		if(!mywarn) return api.sendMessage('✅ ' + event.messageReply.senderID +' chưa bị cảnh cáo lần nào', threadID, messageID);
  		var i = 1;
  		for(let reasonwarn of mywarn) {
  			msg += "\n"+ i + `.${reasonwarn}\n`;
        i++
      }
  		return api.sendMessage(`❎ ` + event.messageReply.senderID +` đã bị cảnh cáo với lý do : ${msg}`, threadID, messageID);
    }
  }
  else{ 
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
    }*///	return utils.throwError(this.config.name, threadID, messageID);
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
  }
};