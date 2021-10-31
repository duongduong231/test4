module.exports.config = {
  name: "threadname",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "thay đổi tên của nhóm",
  commandCategory: "Group",
  usages: "threadname [name]",
  cooldowns: 5,
  info: [
    {
      key: "name",
      prompt: "tên mà bạn muốn thay",
      type: "Văn bản",
      example: "Lê nè"
    }
  ]
};

module.exports.run = async function({ api, event, args }) {
      var content = args.join(" ");
      api.setTitle(`${content}`, event.threadID)
}
