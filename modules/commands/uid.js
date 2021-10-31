module.exports.config = {
	name: "uid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "SpermLord",
	description: "Lấy ID người dùng.",
	commandCategory: "other",
	usages: "uid",
	cooldowns: 5,
	info: [
		{
			key: "tag",
			prompt: "Để trống hoặc tag người cần lấy ID người dùng",
			type: 'Tag',
			example: 'uid @SpermLord'
		}
	]
};

module.exports.run = async function({ api, event, args, Users }) {
  let mentions = Object.keys(event.mentions)[0];
  if (!args[0]) return api.sendMessage(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`, event.threadID, event.messageID);
  else if (!mentions){
  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
	if (!regex.test(args[0])) return api.sendMessage("Phải là một link profile!", event.threadID);
	if (args[0].indexOf("http" || "https") === -1) args[0] = "https://" + args[0];
    var uid = (await Users.linkToUid(args[0])).data;
    return api.sendMessage(uid,event.threadID, event.messageID)
  }
  else {
		for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`${Object.values(event.mentions)[i].replace('@', '')}: ${Object.keys(event.mentions)[i]}`, event.threadID);
		return;
	}
}