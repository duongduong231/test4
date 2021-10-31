module.exports.config = {
	name: "admins",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "",
	commandCategory: "admin",
	usages: "admins",
  cooldowns: 5
};

module.exports.run = async function({ event, api, client, __GLOBAL, Users }) {
        const listAdmin = __GLOBAL.settings.ADMINBOT;
        var msg = [];
        for (const id of listAdmin) {
            const name = (await Users.getData(id)).name || "Người dùng facebook";
            msg.push(`${name} - m.me/${id}`);
        }

        return api.sendMessage(`[Admin] Danh sách toàn bộ admin bot: \n${msg.join("\n")}`, event.threadID, event.messageID);
  /*
	var id = __GLOBAL.settings.ADMINBOT;
	var admins = [];
   	var values = id.split(" ");
  	for (var i = 0; i < id.split(" ").length ; i++) {
            let data = await api.getUserInfo(values[i]);
            admins.push(data[values[i]].name + " - m.me/" + values[i] + "\n")
    	}
    	return api.sendMessage(`=== Danh sách Admin ===\n${admins.join(' ')}`,event.threadID);      
      */
}