module.exports.config = {
	name: "sendit",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "banledangyeuu",
	description: " ",
	commandCategory: "admin",
	usages: "",
	cooldowns: 0
};

module.exports.handleReply = ({ api, event, args, handleReply ,client}) => {
	if(event.senderID != handleReply.author) return; 
  let arg = event.body.split(" => ")
  let text =  arg[1];
  let thread = arg[0];
  let arrnum = thread.split(" ");
  let nums = arrnum.map(n => parseInt(n));
  for(let num of nums) {
    var target = handleReply.list[num-1];
    api.sendMessage(`[SENDIT] ${text}`,target);
  }
  api.sendMessage("Đã gửi tin nhắn tới nhóm(s) với nội dung: "+text, event.threadID, event.messageID);
}


module.exports.run = async function({ api, event, args, Threads, client, __GLOBAL }) { 
  const list = __GLOBAL.settings.allow;
  if(!args[0]) {
  let msg = "", num = 0;
			for (let value of list) {
		  let threadInfo = await api.getThreadInfo(value),
			threadName = threadInfo.threadName			
      msg += (`${num+=1}. ${threadName} - ${value}\n`);
			}
    api.sendMessage(`${msg}`, event.threadID, (e, info) => client.handleReply.push({
  	name: this.config.name,
  	messageID: info.messageID,
    author: event.senderID,
  	list
  }))
  } else {
      let arg = args.join(" ").split(" => ")
      let text =  arg[1];
      let thread = arg[0];
      let arrnum = thread.split(" ");
			for (let arr of arrnum) {
        api.sendMessage(`[SENDIT] ${text}`,arr);
      }
      api.sendMessage("Đã gửi tin nhắn tới nhóm(s) với nội dung: "+text, event.threadID, event.messageID);
			}
}                                                         