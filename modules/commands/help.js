module.exports.config = {
	name: "help",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "help [Text]",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			prompt: 'Là lệnh bạn cần biết thêm thông tin chi tiết.',
			type: 'Văn Bản',
			example: 'help'
		}
	]
};

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
	const command = client.commands.get(args[0]);
	const threadSetting = client.threadSetting.get(event.threadID.toString()) || {};
  const fs = require("fs-extra")
  fs.readFile(__dirname + "/cache/fact.json", (err, data) => {
  var fact = JSON.parse(data).fact
	if (!command) {
		const commands = client.commands.values();
		var group = [], msg = "";
		for (const commandConfig of commands) {
      if(commandConfig.config.hide == undefined || commandConfig.config.hide == false) {
			if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
			else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
      }
    }
		group.forEach(commandGroup => msg += `===== ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} =====\n${commandGroup.cmds.join(', ')}\n\n`);
		return api.sendMessage(msg + `[ Sử dụng: "${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : __GLOBAL.settings.PREFIX}help từng lệnh ở trên" để xem chi tiết cách sử dụng! | Hiện tại đang có ${client.commands.size} lệnh có thể sử dụng trên bot này ]\n\n[Fact: ${fact[Math.floor(Math.random() * fact.length)]}]`, event.threadID);

	}

	const infoHelp = command.config.info;
	var infoText = "";
	if (!infoHelp || infoHelp.length == 0) infoText = 'Không có';
	else {
		for (var i = 0; i < infoHelp.length; i++) {
			infoText +=
				`\n\n key: ${infoHelp[i].key}` + 
				`\n • Thông tin: ${infoHelp[i].prompt}` + 
				`\n • Định dạng: ${infoHelp[i].type}` + 
				`\n • Ví dụ: ${infoHelp[i].example}\n`
		}
	}
	return api.sendMessage(
		`=== ${command.config.name.toUpperCase()} ===\n${command.config.description}\n\n❯ Group: ${command.config.commandCategory}\n❯ Usage: ${command.config.usages}\n❯ Trong đó: ${infoText}\n❯ Cooldown: ${command.config.cooldowns}s\n❯ Prefix: ${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : __GLOBAL.settings.PREFIX}\n\n[Fact: ${fact[Math.floor(Math.random() * fact.length)]}]`, event.threadID)
})
}