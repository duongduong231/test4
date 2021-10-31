module.exports.config = {
	name: "ban",
	version: "2.7.1",
	hasPermssion: 0,
	credits: "",
	description: "Ban thành viên vĩnh viễn khỏi nhóm",
	commandCategory: "group (QTV)",
	usages: "ban [key]",
	cooldowns: 0,
	info: [
		{
			key: '[tag/reply tin nhắn] "lý do"',
			prompt: 'cấm thành viên vào nhóm',
			type: '',
			example: 'ban [tag] "lý do cảnh cáo"'
  	},
		{
			key: 'free',
			prompt: 'xóa user khỏi danh sách bị cấm vào nhóm',
			type: '',
			example: 'ban free [id của user cần xóa]'
  	},		{
			key: 'list',
			prompt: 'xem danh sách user bị cấm vào nhóm',
			type: '',
			example: 'ban list'
  		},
		{
			key: 'reset',
			prompt: 'Reset toàn bộ dữ liệu ban trong nhóm của bạn',
			type: '',
			example: 'ban reset'
  	}
  ]
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client, __GLOBAL }) {
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
  	var id = parseInt(args[1]), a = JSON.stringify(bans.banned[event.threadID])
  	let info = await api.getThreadInfo(threadID);
	  if (!info.adminIDs.some(item => item.id == senderID)) return api.sendMessage('❎Chỉ qtv nhóm mới có thể sử dụng lệnh unban!', threadID, messageID);
  	else if(!id) return api.sendMessage("❎Cần nhập id người cần xóa khỏi danh sách bị cấm vào nhóm", threadID, messageID);
  	else if(!a.includes(id)) return api.sendMessage("✅Người này chưa bị cấm vào nhóm của bạn", threadID, messageID);
		api.sendMessage(`✅Đã xóa thành viên có id ${id} khỏi danh sách bị cấm vào nhóm`, threadID, messageID);
		var mybox = bans.banned[threadID];
    mybox.splice(mybox.indexOf(id), 1);
    //delete bans.reasonBan[threadID][id]
		return fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  } 
  else if(args[0] == "list") {
	  if (!info.adminIDs.some(item => item.id == senderID)) return api.sendMessage('❎Chỉ qtv nhóm mới có thể sử dụng lệnh!', threadID, messageID); 	
  	var mybox = bans.banned[threadID];
  	var msg = "";
  	for(let iduser of mybox) {
  	  let info = await api.getThreadInfo(threadID);
  	  var reasonban = bans.reasonBan[threadID][iduser];
  		var name = (await api.getUserInfo(iduser))[iduser].name;
  		msg += "╔Name: " + name + "\n║ID: "+ iduser+ "\n╚Reason: " + reasonban + "\n";
  	}
  	msg == "" ? api.sendMessage("✅Nhóm bạn chưa có ai bị cấm vào nhóm", threadID, messageID) : api.sendMessage("❎Những thành viên đã bị cấm vào nhóm:\n"+msg, threadID, messageID);
  return
  }
  else if(args[0] == "reset") {
  	let info = await api.getThreadInfo(threadID);
	  if (!info.adminIDs.some(item => item.id == senderID)) return api.sendMessage('❎Chỉ qtv nhóm mới có thể sử dụng lệnh!', threadID, messageID); 	
  	bans.reasonBan[threadID] = {};
  	bans.banned[threadID] = [];
  	fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  	return api.sendMessage("Đã reset toàn bộ dữ liệu ban trong nhóm của bạn", threadID, messageID);
  }
  else{ 
    if (event.type != "message_reply" && Object.keys(event.mentions).length == 0)	return utils.throwError(this.config.name, threadID, messageID);
    let info = await api.getThreadInfo(threadID);
	  if (!info.adminIDs.find(el => el.id == senderID)) return api.sendMessage('Chỉ qtv nhóm mới có thể cấm thành viên!', threadID, messageID);
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
		  		console.log(namearr);
		  		console.log(message);
		  		vitrivalue = message.indexOf(valuemention);
		  		console.log(vitrivalue);
		  		message = message.replace(valuemention,"");
		  	}
		reason = message.replace(/\s+/g, ' ');
		}
		var arraytag = [];
		var arrayname = [];
		for(let iid of iduser) {
			var id = parseInt(iid);
			var nametag = (await api.getUserInfo(id))[id].name;
			arraytag.push({id: id, tag: nametag});		
			if(!reason) reason += "Không có lý do nào được đưa ra";
			var dtwmybox = bans.reasonBan[threadID];
			if(!dtwmybox.hasOwnProperty(id)) dtwmybox[id] = [];
			arrayname.push(nametag);
			var pushreason = bans.reasonBan[threadID][id];
			pushreason.push(reason);
			if(!bans.banned[threadID]) bans.banned[threadID] = [];
      bans.banned[threadID].push(id);
      api.removeUserFromGroup(parseInt(id), threadID)
		}
		api.sendMessage({body: `Đã ban thành viên ${arrayname.join(", ")} vĩnh viễn khỏi nhóm với lý do: ${reason}`, mentions: arraytag}, threadID, messageID);
		return fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  } 
};