module.exports.config = {
	name: "unsend",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "SpermLord",
	description: "Gỡ tin nhắn của bot",
	commandCategory: "system",
	usages: "unsend",
	cooldowns: 0,
	info: [
		{
			key: 'unsend',
			prompt: 'Reply tin nhắn cần gỡ bỏ',
			type: 'Văn Bản',
			example: 'unsend'
		}
	]
};
module.exports.run = function({ api, event }) {
	if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage('Không thể gỡ tin nhắn của người khác.', event.threadID, event.messageID);
	if (event.type != "message_reply") return api.sendMessage('Hãy reply tin nhắn cần gỡ.', event.threadID, event.messageID);
	return api.unsendMessage(event.messageReply.messageID);
}

/*
{
  type: 'message_reply',
  threadID: '4045191182196254',
  messageID: 'mid.$gAA5fFHd2nh6BVxaXCF7JdFIVMxFe',
  senderID: '100043510592039',
  attachments: [],
  body: 'abcd',
  isGroup: true,
  mentions: {},
  timestamp: 1628427079432,
  messageReply: {
    threadID: '4045191182196254',
    messageID: 'mid.$gAA5fFHd2nh6BVxZ4R17JdEvdLvoW',
    senderID: '100071225328261',
    attachments: [],
    body: 'Không tìm thấy team bạn cần xóa',
    isGroup: true,
    mentions: {},
    timestamp: 1628427071559
  }
  
  {
  type: 'message_reaction',
  threadID: '4045191182196254',
  messageID: 'mid.$gAA5fFHd2nh6BVxZ4R17JdEvdLvoW',
  reaction: '😮',
  senderID: '100071225328261',
  userID: '100043510592039'
}

{
  type: 'message_reaction',
  threadID: '3759052324182153',
  messageID: 'mid.$gAA1a1pJ5mImBVxJtyF7Jc0gkYGYL',
  reaction: '😢',
  senderID: '100013390784794',
  userID: '100057702674982'
}*/