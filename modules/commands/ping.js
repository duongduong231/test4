module.exports.config = {
	name: "ping",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "SpermLord",
	description: "tag toàn bộ thành viên",
	commandCategory: "Group (QTV)",
	usages: "ping [Text]",
	cooldowns: 60,
	info: [
		{
			key: 'Text',
			prompt: 'Nội dung để ping, có thể để trống',
			type: 'Văn Bản',
			example: 'Mọi người ơi'
		}
	]
};

module.exports.run = async function({ api, event, args }) {
	let threadInfo = await api.getThreadInfo(event.threadID);
  const find = threadInfo.adminIDs.find(el => el.id == event.senderID);
  if (!find) return api.sendMessage(`Cần là quản trị viên!`,event.threadID);  
  let all = threadInfo.participantIDs;
	all.splice(all.indexOf(api.getCurrentUserID()), 1);
	all.splice(all.indexOf(event.senderID), 1);
	  var body = (args.length != 0) ? args.join(" ") : "@everyone", mentions = [], index = 0;
		for (let i = 0; i < all.length; i++) {
			body = "‎" + body;
			mentions.push({ id: all[i], tag: "‎", fromIndex: index - 1 });
			index -= 1;
		}

		return api.sendMessage({ body, mentions }, event.threadID, event.messageID);
 
  /*var body = args.join(" ")|| '@everyone', mentions = [];
	for (let i = 0; i < all.length; i++) {
		if (i == body.length) body += body.charAt(body.length - 1);
		mentions.push({
			tag: body[i],
			id: all[i],
			fromIndex: i - 1
		});
	}
	api.sendMessage({ body: `‎${body}`, mentions }, event.threadID, async (err, info) => {
		await new Promise(resolve => setTimeout(resolve, 2 * 1000));
		//api.deleteMessage(info.messageID);
	}, event.messageID);
  */
  
  	/*const botID = api.getCurrentUserID();
    const threadInfo = (await api.getThreadInfo(event.threadID)).participantIDs
		const listUserID = threadInfo.filter(ID => ID != botID && ID != event.senderID);
		var body = (args.length != 0) ? args.join(" ") : "@everyone", mentions = [], index = 0;
		
		for(const idUser of listUserID) {
			body = "‎" + body;
			mentions.push({ id: idUser, tag: "‎", fromIndex: index - 1 });
			index -= 1;
		}

		return api.sendMessage({ body, mentions }, event.threadID, event.messageID);
*/
}