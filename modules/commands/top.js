module.exports.config = {
	name: "top",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Xem top server những người dùng khủng nhất!",
	commandCategory: "Group",
	usages: "top",
	cooldowns: 10,
  	info: [
		{
			key: 'Data',
			prompt: 'money/exp',
			type: 'Văn Bản',
			example: 'money'
		}
       ]
};

module.exports.run = async function({ api,args, event, Currencies }) {
    var {threadID, messageID} = event;
    if (args[0] == "money") {
 				let num = 0;
				let all = await Currencies.getAll(['name', 'userID', 'money']);
        let count = !args[1] ? all.length > 10 ? 10 : all.length : args[1];
				all.sort((a, b) => b.money - a.money);
				let msg = {
				  body: `Top ${count} người dùng giàu nhất toàn server.`,
				  mentions: []
				} 
				for (var i = 0; i < count; i++) {
				  num += 1;
				  msg.body += '\n' + num + '. ' + all[i].name + ': ' + all[i].money + ' LE ';
				}
				return api.sendMessage(msg, threadID, messageID);
    }
    if (args[0] == "exp") {
 				let num = 0;
				let all = await Currencies.getAll(['name', 'exp']);
     	
      let count = !args[1] ? all.length > 10 ? 10 : all.length : args[1];
      all.sort((a, b) => b.exp - a.exp);
      function expToLevel(point) {
        if (point < 0) return 0;
        return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
      }

				let msg = {
				  body: `Top ${count} người dùng tương tác kinh nhất toàn server.`,
				  mentions: []
				} 
				for (var i = 0; i < count; i++) {
				  num += 1;
				  msg.body += '\n' + num + '. ' + all[i].name + ': ' + all[i].exp + ' tin nhắn'+ ' - Level: ' + expToLevel(all[i].exp) ;
				}
				return api.sendMessage(msg, threadID, messageID);
    }
    else return api.sendMessage("Dùng [/top money] để xem top người dùng giàu nhất hoặc [/top exp] để xem top người dùng tương tác cao nhất!", threadID, messageID);
;
}