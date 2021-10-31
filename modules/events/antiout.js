module.exports.config = {
	name: "antiout",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "banledangyeuu",
	description: ""
};

module.exports.run = async function({ api, event, Users, Threads, client }) {
    const threadData = client.threadSetting.get(event.threadID) || {};
  	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    //if (typeof threadData["antiOut"] != "undefined" && threadData["antiOut"] == false) return;
    if (threadData["antiOut"] != true) return;
    let threadInfo = await api.getThreadInfo(event.threadID);
  (event.logMessageData.leftParticipantFbId == event.author) ? (threadInfo.approvalMode == false) ? api.addUserToGroup(event.author, event.threadID, (err, info) => { (err) ? api.sendMessage("[ANTIOUT] Đã có lỗi xảy ra!", event.threadID) : api.sendMessage( "[ANTIOUT] Đã thêm vào nhóm !\nSử dụng /out [lý do rời] để xin rời nhóm", event.threadID)}) :  (threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID())) ? api.addUserToGroup(event.author, event.threadID, (err, info) => { (err) ? api.sendMessage("[ANTIOUT] Đã có lỗi xảy ra!", event.threadID) : api.sendMessage( "[ANTIOUT] Đã thêm vào nhóm !\nSử dụng /out [lý do rời] để xin rời nhóm", event.threadID) }) : api.addUserToGroup(event.author, event.threadID, (err, info) => { (err) ? api.sendMessage("[ANTIOUT] Đã có lỗi xảy ra!", event.threadID) : api.sendMessage("[ANTIOUT] Đã thêm vào danh sách phê duyệt !\nSử dụng /out [lý do rời] để xin rời nhóm", event.threadID)}) : "";
}