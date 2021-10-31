module.exports.config = {
	name: "user",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "CatalizCS",
	description: "Cấm hoặc gỡ cấm người dùng",
	commandCategory: "system",
	usages: "user args input",
	cooldowns: 5,
	info: [
		{
			key: 'args => ban',
			prompt: 'Nhập input là ID người dùng cần ban',
			type: 'Number',
			example: '100000'
		},
		{
			key: 'args => unban',
			prompt: 'Nhập input là ID người dùng cần unban',
			type: 'Number',
			example: '100000'
		},
		{
			key: 'args => search',
			prompt: 'Nhập input là từ khoá cần tìm người dùng',
			type: 'String',
			example: 'khu'
		}
	]
};

module.exports.handleReaction = async ({ event, api, Users, client, handleReaction }) => {
	if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
	switch (handleReaction.type) {
		case "ban": {
			var name = (await Users.getData(handleReaction.target)).name || (await api.getUserInfo(handleReaction.target))[handleReaction.target].name;
			await Users.setData(handleReaction.target, { banned: 1 });
			let dataUser = client.userBanned.get(handleReaction.target) || {};
			dataUser["banned"] = 1;
			client.userBanned.set(handleReaction.target.toString(), dataUser);
			api.sendMessage(`[${handleReaction.target} | ${name}] Đã ban thành công!`, event.threadID, () => api.unsendMessage(handleReaction.messageID));
			break;
		}
		case "unban": {
			var name = (await Users.getData(handleReaction.target)).name || (await api.getUserInfo(handleReaction.target))[handleReaction.target].name;
			await Users.setData(handleReaction.target, {reasonban: "", banned: 0 });
			let dataUser = client.userBanned.get(handleReaction.target) || {};
			dataUser["reasonban"] = "";
			client.userBanned.set(handleReaction.target, dataUser);
      client.userBanned.delete(handleReaction.target.toString());
			api.sendMessage(`[${handleReaction.target} | ${name}] Đã unban thành công!`, event.threadID, () => api.unsendMessage(handleReaction.messageID));
			break;
		}
		default:
			break;
	}
}

module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users }) {
	if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;
  	switch (handleReply.type) {  
      case "ban": {
			var name = (await Users.getData(handleReply.target)).name || (await api.getUserInfo(handleReply.target))[handleReply.target].name;
			await Users.setData(handleReply.target, { reasonban: event.body, banned: 1 });
			let dataUser = client.userBanned.get(handleReply.target) || {};
			dataUser["reasonban"] = event.body;
			dataUser["banned"] = 1;
			client.userBanned.set(handleReply.target, dataUser);
			return api.sendMessage(`[${handleReply.target} | ${name}] Đã ban với lý do: ` + event.body, event.threadID, () => api.unsendMessage(handleReply.messageID));
      			break;
		}
		case "unban": {
			break;
    }
		default:
			break;
	}
	};

module.exports.run = async ({ event, api, args, Users, client }) => {
	let content = args.slice(1, args.length);
	switch (args[0]) {
		case "ban": {
      var mention = Object.keys(event.mentions);
      if (!mention[0]){
			if (content.length == 0) {
        if (event.type == "message_reply") return api.sendMessage(`[${event.messageReply.senderID}] Bạn muốn ban người dùng này ?\n\nHãy reaction vào tin nhắn này để ban\nReply tin nhắn này để thêm lý do ban`, event.threadID, (error, info) => {
					client.handleReaction.push({
						name: this.config.name,
						messageID: info.messageID,
						author: event.senderID,
						type: "ban",
            threadID: event.threadID,
						target: event.messageReply.senderID
					});
          client.handleReply.push({ 
            name: this.config.name,
            messageID: info.messageID,
						author: event.senderID,
						type: "ban",
            replyID: event.messageID, 
            threadID: event.threadID,
						target: event.messageReply.senderID,
          });
        })
        else return api.sendMessage("Bạn cần phải nhập ID user cần ban!", event.threadID);
      }
			for (let idUser of content) {
				idUser = parseInt(idUser);
				if (isNaN(idUser)) return api.sendMessage(`[${idUser}] không phải là IDUser!`, event.threadID);
				let dataUser = (await Users.getData(idUser.toString()));
				if (!dataUser) return api.sendMessage(`[${idUser}] người dùng không tồn tại trong database!`, event.threadID);
				if (dataUser.banned) return api.sendMessage(`[${idUser}] Người dùng đã bị ban từ trước`, event.threadID);
				return api.sendMessage(`[${idUser}] Bạn muốn ban người dùng này ?\n\nHãy reaction vào tin nhắn này để ban\nReply tin nhắn này để thêm lý do ban`, event.threadID, (error, info) => {
					client.handleReaction.push({
						name: this.config.name,
						messageID: info.messageID,
						author: event.senderID,
						type: "ban",
            threadID: event.threadID,
						target: idUser
					});
          client.handleReply.push({ 
            name: this.config.name,
            messageID: info.messageID,
						author: event.senderID,
						type: "ban",
            replyID: event.messageID, 
            threadID: event.threadID,
						target: idUser,
          });
				})
       }    
       }
      for (let o in mention) {
        let dataUser = (await Users.getData(mention[o].toString()));
        if (!dataUser) return api.sendMessage(`[${mention[o]}] người dùng không tồn tại trong database!`, event.threadID);
        if (dataUser.banned) return api.sendMessage(`[${mention[o]}] Người dùng đã bị ban từ trước`, event.threadID);
        return api.sendMessage(`[${mention[o]}] Bạn muốn ban người dùng này ?\n\nHãy reaction vào tin nhắn này để ban\nReply tin nhắn này để thêm lý do ban`, event.threadID, (error, info) => {
          client.handleReaction.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "ban",
            threadID: event.threadID,
            target: mention[o]
          });
          client.handleReply.push({ 
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "ban",
            replyID: event.messageID, 
            threadID: event.threadID,
            target: mention[o],
          });
        })
      }
			break;
		}
		case "unban": {
        var mention = Object.keys(event.mentions);
      if (!mention[0]){   
			if (content.length == 0) {
        if (event.type == "message_reply") return api.sendMessage(`[${event.messageReply.senderID}] Bạn muốn unban người dùng này ?\n\nHãy reaction vào tin nhắn này để unban`, event.threadID, (error, info) => {
					client.handleReaction.push({
						name: this.config.name,
						messageID: info.messageID,
						author: event.senderID,
						type: "unban",
						target: event.messageReply.senderID
					});
				})
        else return api.sendMessage("Bạn cần phải nhập ID user cần ban!", event.threadID);
      } 			
      for (let idUser of content) {
				idUser = parseInt(idUser);
				if (isNaN(idUser)) return api.sendMessage(`[${idUser}] không phải là ID người dùng!`, event.threadID);
				let dataUser = (await Users.getData(idUser.toString()));
				if (!dataUser) return api.sendMessage(`[${idUser}] người dùng không tồn tại trong database!`, event.threadID);
				if (!dataUser.banned) return api.sendMessage(`[${idUser}] người dùng không bị ban từ trước`, event.threadID);
				return api.sendMessage(`[${idUser}] Bạn muốn unban người dùng này ?\n\nHãy reaction vào tin nhắn này để ban!`, event.threadID, (error, info) => {
					client.handleReaction.push({
						name: this.config.name,
						messageID: info.messageID,
						author: event.senderID,
						type: "unban",
						target: idUser
					});
				})
			}
        }
          for (let o in mention) {
         let dataUser = (await Users.getData(mention[o].toString()));
        if (!dataUser) return api.sendMessage(`[${mention[o]}] người dùng không tồn tại trong database!`, event.threadID);
        if (!dataUser.banned) return api.sendMessage(`[${mention[o]}] người dùng không bị ban từ trước`, event.threadID);
        return api.sendMessage(`[${mention[o]}] Bạn muốn unban người dùng này ?\n\nHãy reaction vào tin nhắn này để ban!`, event.threadID, (error, info) => {
          client.handleReaction.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "unban",
            target: mention[o]
          });
        })
      }
   		break;
		}
    case "banList": {
            var data = await Users.getAll(['name', 'userID','reasonban'],{banned: true});
            var userBlockMsg = "";
            data.forEach(user => userBlockMsg += `\n${user.name} - ${user.userID}: ${(user.reasonban == null) ? "Không có lý do": user.reasonban}`);
            api.sendMessage((userBlockMsg) ? `🛠 | Đây là danh sách những người dùng bị ban:${userBlockMsg}` : 'Chưa có người dùng nào bị bạn cấm!', event.threadID, event.messageID);
    break;
    }
		case "search": {
			let contentJoin = content.join(" ");
			let getUsers = (await Users.getAll(['userID', 'name'])).filter(item => !!item.name);
			let matchUsers = [], a = '', b = 0;
			getUsers.forEach(i => {
				if (i.name.toLowerCase().includes(contentJoin.toLowerCase())) {
					matchUsers.push({
						name: i.name,
						id: i.userID
					});
				}
			});
			matchUsers.forEach(i => a += `\n${b += 1}. ${i.name} - ${i.id}`);
			(matchUsers.length > 0) ? api.sendMessage(`Đây là kết quả phù hợp: \n${a}`, event.threadID) : api.sendMessage("Không tìm thấy kết quả dựa vào tìm kiếm của bạn!", event.threadID);
			break;
		}
		default:
			break;
	}
}