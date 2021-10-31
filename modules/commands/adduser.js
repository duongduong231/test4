module.exports.config = {
  name: "adduser",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "System",
  usages: "",
  cooldowns: 10
};

module.exports.run = async ({ api, event, args, Users }) => {
  var { threadID, messageID } = event;
  var threadInfo = await api.getThreadInfo(threadID);
  //var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  (args[0].indexOf("http" || "https") === -1) ? (isNaN(args[0])) ? args[0] = "https://" + args[0] : args[0] : "";
	//(!regex.test(args[0])) ? isNaN(args[0]) ? api.sendMessage("Phải là một link profile hoac uid!", event.threadID) : 
  (!isNaN(args[0])) ? (threadInfo.participantIDs.includes(args[0])) ? api.sendMessage("Đã tồn tại trong nhóm", threadID, messageID) : 
  (threadInfo.approvalMode == false) ? api.addUserToGroup(args[0], threadID, (err, info) => { (err) ? api.sendMessage("Đã có lỗi xảy ra!", threadID) : api.sendMessage( "Đã thêm " + args[0] + " vào nhóm !", threadID, messageID)}) : 
  (threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID())) ? api.addUserToGroup(args[0], threadID, (err, info) => { (err) ? api.sendMessage("Đã có lỗi xảy ra!", threadID) : api.sendMessage( "Đã thêm " + args[0] + " vào nhóm !", threadID, messageID) }) : 
  api.addUserToGroup(args[0], threadID, (err, info) => { (err) ? api.sendMessage("Đã có lỗi xảy ra!", threadID) : api.sendMessage("Đã thêm " + args[0] + " vào danh sách phê duyệt !", threadID, messageID)}) : "";

  
  var uid = (await Users.linkToUid(args[0])).data;
  var name = (await api.getUserInfo(uid))[uid].name;
  (!args[0]) ? api.sendMessage("Vui lòng điền url người cần thêm vào nhóm", threadID, messageID) : 
  (threadInfo.participantIDs.includes(uid)) ? api.sendMessage("Đã tồn tại trong nhóm", threadID, messageID) : 
  (threadInfo.approvalMode == false) ? api.addUserToGroup(uid, threadID, (err, info) => { (err) ? api.sendMessage("Đã có lỗi xảy ra!", threadID) : api.sendMessage( "Đã thêm " + name + " vào nhóm !", threadID, messageID)}) : 
  (threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID())) ? api.addUserToGroup(uid, threadID, (err, info) => { (err) ? api.sendMessage("Đã có lỗi xảy ra!", threadID) : api.sendMessage( "Đã thêm " + name + " vào nhóm !", threadID, messageID) }) : 
  api.addUserToGroup(uid, threadID, (err, info) => { (err) ? api.sendMessage("Đã có lỗi xảy ra!", threadID) : api.sendMessage("Đã thêm " + name + " vào danh sách phê duyệt !", threadID, messageID)});
}
