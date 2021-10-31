module.exports.config = {
	name: "kill",
	version: "1.0.0", 
	hasPermssion: 2,
	credits: "banledangyeuu",
	description: "",
	commandCategory: "admin", 
	usages: "kill [tag]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args, Users, Currencies, Threads }) {
    var {threadID, messageID, senderID} = event;
    if (args[0] == "user"){
            let number = [];
            let uidAll = await Currencies.getAll(['userID','exp']);
            uidAll.forEach(user => {
            if(user.exp > 1) return;
                Users.delData(user.userID);
                Currencies.delData(user.userID);
                number.push(user.userID);
            })
            return api.sendMessage(`Đã lọc ${number.length} cá cảnh.`,threadID);
    }
    if(args[0] == "thread"){
            //let number = [];
            api.getThreadList(50, null, ["INBOX"], (err, list) => getInfo({ list }))
            api.getThreadList(50, null, ["OTHER"], (err, list) => getInfo({ list }))
            api.getThreadList(50, null, ["PENDING"], (err, list) => getInfo({ list }))
            api.getThreadList(50, null, ["unread"], (err, list) => getInfo({ list }))
            var getInfo = ({ list }) => {
              list.forEach(info => {
                if (info.name == "" || info.participants < 8 || info.imageSrc == null) { 
                  //number.push(info);
                  api.removeUserFromGroup(api.getCurrentUserID(),info.threadID);
                  api.deleteThread(info.threadID, (err) => {
                    Threads.delData(info.threadID)
                    if(err) return console.error(err);
                    });
                }
              })
            }
           return api.sendMessage(`Đã lọc những nhóm không tên hoặc dưới 4 thành viên.`,threadID)
}
}