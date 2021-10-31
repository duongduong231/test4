module.exports.config = {
	name: "uptime",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Kiểm tra thời gian bot đã online",
	commandCategory: "system",
	usages: "uptime",
	cooldowns: 5
};
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
	
module.exports.event = async ({ api, event, client, __GLOBAL }) => {
  const fs = require("fs-extra")
  const pidusage = require('pidusage')
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
	const threadSetting = client.threadSetting.get(event.threadID.toString()) || {};
  if (event.body == `${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : __GLOBAL.settings.PREFIX}`) {
    fs.readFile(__dirname + "/cache/fact.json", (err, data) => {
      var fact = JSON.parse(data).fact
      pidusage(process.pid, function (err, stats) {
        const timeStart = Date.now();
        const list = __GLOBAL.settings.allow;
        return api.sendMessage("", event.threadID, () => api.sendMessage(`Đã hoạt động được ${hours} giờ ${minutes} phút ${seconds} giây.\n\n❯ Tổng người dùng: ${client.allUser.length}\n❯ Tổng nhóm: ${client.allThread.length}\n❯ Số nhóm được sử dụng: ${list.length - 1}/10\n❯ Cpu đang sử dụng: ${stats.cpu.toFixed(1)}%\n❯ Ram đang sử dụng: ${byte2mb(stats.memory)}\n❯ Ping: ${Date.now() - timeStart}ms\n\n[Fact: ${fact[Math.floor(Math.random() * fact.length)]}]`, event.threadID, event.messageID));
        //return api.sendMessage("", event.threadID, () => api.sendMessage(`[https://bio.link/banledangyeuu]\n\nĐã hoạt động được ${hours} giờ ${minutes} phút ${seconds} giây.\n\n❯ Tổng người dùng: ${client.allUser.length}\n❯ Tổng nhóm: ${client.allThread.length}\n❯ Cpu đang sử dụng: ${stats.cpu.toFixed(1)}%\n❯ Ram đang sử dụng: ${byte2mb(stats.memory)}\n❯ Ping: ${Date.now() - timeStart}ms\n\n[Fact: ${fact[Math.floor(Math.random() * fact.length)]}]`, event.threadID, event.messageID));
      })
    })
  }
}

module.exports.run = async ({ api, event, client,__GLOBAL }) => {
  const fs = require("fs-extra")
  const pidusage = require('pidusage')
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
	const timeStart = Date.now();
  fs.readFile(__dirname + "/cache/fact.json", (err, data) => {
    var fact = JSON.parse(data).fact
	  pidusage(process.pid, function (err, stats) {
	    const timeStart = Date.now();
      const list = __GLOBAL.settings.allow;
        return api.sendMessage("", event.threadID, () => api.sendMessage(`Đã hoạt động được ${hours} giờ ${minutes} phút ${seconds} giây.\n\n❯ Tổng người dùng: ${client.allUser.length}\n❯ Tổng nhóm: ${client.allThread.length}\n❯ Số nhóm được sử dụng: ${list.length - 1}/10\n❯ Cpu đang sử dụng: ${stats.cpu.toFixed(1)}%\n❯ Ram đang sử dụng: ${byte2mb(stats.memory)}\n❯ Ping: ${Date.now() - timeStart}ms\n\n[Fact: ${fact[Math.floor(Math.random() * fact.length)]}]`, event.threadID, event.messageID));
	    //return api.sendMessage("", event.threadID, () => api.sendMessage(`[https://bio.link/banledangyeuu]\n\nĐã hoạt động được ${hours} giờ ${minutes} phút ${seconds} giây.\n\n❯ Tổng người dùng: ${client.allUser.length}\n❯ Tổng nhóm: ${client.allThread.length}\n❯ Cpu đang sử dụng: ${stats.cpu.toFixed(1)}%\n❯ Ram đang sử dụng: ${byte2mb(stats.memory)}\n❯ Ping: ${Date.now() - timeStart}ms\n\n[Fact: ${fact[Math.floor(Math.random() * fact.length)]}]`, event.threadID, event.messageID));
    })
  })
}