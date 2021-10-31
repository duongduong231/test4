module.exports.config = {
  name: "delete",
  version: "0.0.1",
  hasPermssion: 2,
  credits: "banledangyeuu",
  description: "Xóa data",
  commandCategory: "Admin",
  usages: "delete [data] [id]",
  cooldowns: 0
};

module.exports.run = async function({api, event, args, Threads, Users, Currencies}) {
  if (args[0] == "thread") {
    if (!args[1]) {
      return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID, () => Threads.delData(event.threadID));
    } else {
      return api.removeUserFromGroup(api.getCurrentUserID(), args[1], () => {
        Threads.delData(args[1]);
        api.sendMessage("Đã xóa!", event.ThreadID, event.messageID);
      });
    }
  }
  if (args[0] == "user") {
     Users.delData(args[1]);
     Currencies.delData(args[1])
      api.sendMessage("Đã xóa!", event.ThreadID, event.messageID)
   
  }
};
