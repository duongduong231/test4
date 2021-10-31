module.exports.config = {
  name: "info",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "CatalizCS",
  description: "Hướng dẫn cho người mới",
  commandCategory: "Group",
  usages: "info [tag] [id]",
  cooldowns: 5,
  info: [
    {
      key: "tag",
      prompt: "Loại dữ liệu bạn muốn xem.",
      type: "Văn Bản",
      example: "user/box"
    },
    {
      key: "id",
      prompt: "Dữ liệu bạn muốn xem.",
      type: "Văn Bản",
      example: "(user) tag hoặc userID hoặc để trống / (box) threadID hoặc để trống"
    }
  ],
    envConfig: {
    "ACCESS_TOKEN": "EAAAAZAw4FxQIBAGDdCufZBr3QXymiLMZCLKTJYo0o9ZCSqZClz1qNfJQeVyGtDX1w3wB9pTZCUMDhJsClZBRjBAG6FHnMXi95vZAz4VVilQPRsNkS6fW8GIl9z8MWOhTPW34pHs9GmAWfZB2X8NlgilAlC2uanqayjw25Shp5FQnaKMxQ3JgfX9ZCn "
    }
};

module.exports.run = async function({ api, event, args, client, __GLOBAL, Users }) {
  const fs = require("fs-extra");
  const axios = require("axios");
  const request = require("request");

  const content = args[0];
  if (!content)
  return api.sendMessage(`Chưa nhập dữ liệu cần thiết, bạn muốn xem info user hay box ?`, event.threadID,event.messageID);
  if (content.indexOf("user") !== -1) {
    let mentions = Object.keys(event.mentions)[0];
    if (!mentions) {
      if (!args[1]){ 
      var id = (event.type == "message_reply") ? event.messageReply.senderID : event.senderID;
      let value = await api.getThreadInfo(event.threadID);
      if (!(value.nicknames)[id]) value = (await Users.getInfo(id)).name;
      else value = (value.nicknames)[id];

      let data = await api.getUserInfo(id);
      let Avatar = (await axios.get(`https://le31.glitch.me/avt?q=${id}`,{ responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + "/cache/avt.png",Buffer.from(Avatar, "utf-8"));
      return api.sendMessage(
        {
          body:
            "🤓 Tên: " + `${data[id].name}\n` +
            "🍉 Nick: " + `${value}\n` +
            "🔖 ID: " + `${id}\n` +
            "✏ Tên người dùng: " + `${data[id].vanity}\n` +
            "🚻 Giới tính: " + `${data[id].gender == 2 ? "Nam" : data[id].gender == 1 ? "Nữ" : "Gay" }\n` +
           `${(id == api.getCurrentUserID()) ? "[🤖 Hi cậu tớ là Bot 🤖]\n" : `🤖 ${data[id].isFriend == true ? "Đã kết bạn với bot" : "Chưa kết bạn với bot"}\n`}` +
            "📎 URL Cá nhân: " + `${data[id].profileUrl}`,
          attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
        },
        event.threadID,
        () => fs.unlinkSync(__dirname + `/cache/avt.png`),
        event.messageID
      );
    } 
      if (isNaN(args[1])) return api.sendMessage(`Vui lòng nhập đúng uid`,event.threadID,event.mesageID)
      else {
      let value = await api.getThreadInfo(event.threadID);
      if (!(value.nicknames[args[1]])) value = (await Users.getInfo(args[1])).name;
      else value = (value.nicknames)[args[1]];
 
      let data = await api.getUserInfo(args[1]);
      let Avatar = (await axios.get(`https://le31.glitch.me/avt?q=${args[1]}`,{ responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + "/cache/avt.png",Buffer.from(Avatar, "utf-8"));
      return api.sendMessage(
        {
          body:
            "🤓 Tên: " + `${data[args[1]].name}\n` +
            "🍉 Nick: " + `${value}\n` + 
            "🔖 ID: " + `${args[1]}\n` +
            "✏ Tên người dùng: " + `${data[args[1]].vanity}\n` +
            "🚻 Giới tính: " + `${data[args[1]].gender == 2 ? "Nam" : data[args[1]].gender == 1 ? "Nữ" : "Gay" }\n` +
            `${(args[1] == api.getCurrentUserID()) ? "[🤖 Hi cậu tớ là Bot 🤖]\n" : `🤖 ${data[args[1]].isFriend == true ? "Đã kết bạn với bot" : "Chưa kết bạn với bot"}\n`}`+
            "📎 URL Cá nhân: " + `${data[args[1]].profileUrl}`,
          attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
        },
        event.threadID,
        () => fs.unlinkSync(__dirname + `/cache/avt.png`),
        event.messageID
      );
        }
    }
      else {
      let value = await api.getThreadInfo(event.threadID);
      if (!(value.nicknames)[mentions]) value = (await Users.getInfo(mentions)).name;
      else value = (value.nicknames)[mentions];

      let data = await api.getUserInfo(mentions);
      let Avatar = (await axios.get(`https://le31.glitch.me/avt?q=${Object.keys(event.mentions)[0]}`,{ responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8"));
      api.sendMessage(
        {
          body:
            "🤓 Tên: " + `${data[mentions].name}\n` +
            "🍉 Nick: " + `${value}\n` +
            "🔖 ID: " + `${Object.keys(event.mentions)[0]}\n` +
            "✏ Tên người dùng: " + `${data[mentions].vanity}\n` +
            "🚻 Giới tính: " + `${data[mentions].gender == 2 ? "Nam" : data[mentions].gender == 1 ? "Nữ" : "Gay"}\n` +
            `${(Object.keys(event.mentions)[0] == api.getCurrentUserID()) ? "[🤖 Hi cậu tớ là Bot 🤖]\n" : `🤖 ${data[mentions].isFriend == true ? "Đã kết bạn với bot" : "Chưa kết bạn với bot"}\n`}` +
            "📎 URL Cá nhân: " + `${data[mentions].profileUrl}`,
          attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
        },
        event.threadID,
        () => fs.unlinkSync(__dirname + `/cache/avt.png`),
        event.messageID
      );
    }
  } else if (content.indexOf("box") !== -1) {
    var content_2 = args[1];
    if (!content_2) {
      let threadInfo = await api.getThreadInfo(event.threadID);
      let threadName = threadInfo.threadName;
      let img = threadInfo.imageSrc; 
      var nam = 0,
        nu = 0,
        bede = 0;
      threadInfo.userInfo.forEach(e => {
        if (e.gender == "MALE") nam += 1;
        else if (e.gender == "FEMALE") nu += 1;
        else bede += 1;
      });
      if (img == null)
        return api.sendMessage(
          {
            body:
              "🎫 Tên nhóm: " + `${threadName}\n` +
              "🏷 ThreadID: " + `${content_2}\n` +
              "💨 Số tin nhắn: " + `${threadInfo.messageCount}\n` +
              "🤑 Emoji: " + `${threadInfo.emoji}\n` +
              "🔐 Phê duyệt thành viên: " + `${ threadInfo.approvalMode == true ? "Đang bật 🔒" : "Đang tắt 🔓" }\n` +
              "❓ Loại: " + `${threadInfo.isGroup == true ? "Nhóm chat" : "Khác"}\n\n` + 
              "______________________________\n" +
              "👨‍👩‍👧‍👦 Số thành viên: " + `${threadInfo.participantIDs.length}\n` +
              "👧 Nữ: " + `${nu}\n` +
              "👦 Nam: " + `${nam}\n` +
              "🏳️‍🌈 Bóng: " + `${bede}\n` +
              "👮 QTV: " + `${threadInfo.adminIDs.length}`
          },
          event.threadID
        );
      else {
        var callback = () =>
          api.sendMessage(
            {
              body:
                "🎫 Tên nhóm: " + `${threadName}\n` +
                "🏷 ThreadID: " + `${event.threadID}\n` +
                "💨 Số tin nhắn: " + `${threadInfo.messageCount}\n` +
                "🤑 Emoji: " + `${threadInfo.emoji}\n` +
                "🔐 Phê duyệt thành viên: " + `${ threadInfo.approvalMode == true ? "Đang bật 🔒" : "Đang tắt 🔓" }\n` +
                "❓ Loại: " + `${threadInfo.isGroup == true ? "Nhóm chat" : "Khác"}\n\n` +
                "______________________________\n" +
                "👨‍👩‍👧‍👦 Số thành viên: " + `${threadInfo.participantIDs.length}\n` +
                "👧 Nữ: " + `${nu}\n` +
                "👦 Nam: " + `${nam}\n` +
                "🏳️‍🌈 Bóng: " + `${bede}\n` +
                "👮 QTV: " + `${threadInfo.adminIDs.length}`
            , attachment: fs.createReadStream(__dirname + "/cache/thread.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/thread.png")
          );
        return request(encodeURI(img))
          .pipe(fs.createWriteStream(__dirname + "/cache/thread.png"))
          .on("close", () => callback());
      }
    } else {
      let threadInfo = await api.getThreadInfo(content_2);
      let threadName = threadInfo.threadName;
      let img = threadInfo.imageSrc;
      var nam = 0,
        nu = 0,
        bede = 0;
      threadInfo.userInfo.forEach(e => {
        if (e.gender == "MALE") nam += 1;
        else if (e.gender == "FEMALE") nu += 1;
        else bede += 1;
      });
      if (img == null)
        return api.sendMessage(
          {
            body:
              "🎫 Tên nhóm: " + `${threadName}\n` +
              "🏷 ThreadID: " + `${content_2}\n` +
              "💨 Số tin nhắn: " + `${threadInfo.messageCount}\n` +
              "🤑 Emoji: " + `${threadInfo.emoji}\n` +
              "🔐 Phê duyệt thành viên: " + `${ threadInfo.approvalMode == true ? "Đang bật 🔒" : "Đang tắt 🔓" }\n` +
              "❓ Loại: " + `${threadInfo.isGroup == true ? "Nhóm chat" : "Khác"}\n\n` +
              "______________________________\n" +
              "👨‍👩‍👧‍👦 Số thành viên: " + `${threadInfo.participantIDs.length}\n` +
              "👧 Nữ: " + `${nu}\n` +
              "👦 Nam: " + `${nam}\n` +
              "🏳️‍🌈 Bóng: " + `${bede}\n` +
              "👮 QTV: " + `${threadInfo.adminIDs.length}`
          },
          event.threadID
        );
      else {
        var callback = () =>
          api.sendMessage(
            {
              body:
                "🎫 Tên nhóm: " + `${threadName}\n` +
                "🏷 ThreadID: " + `${event.threadID}\n` +
                "💨 Số tin nhắn: " + `${threadInfo.messageCount}\n` +
                "🤑 Emoji: " + `${threadInfo.emoji}\n` +
                "🔐 Phê duyệt thành viên: " + `${ threadInfo.approvalMode == true ? "Đang bật 🔒" : "Đang tắt 🔓" }\n` +
                "❓ Loại: " + `${threadInfo.isGroup == true ? "Nhóm chat" : "Khác"}\n\n` +
                "______________________________\n" +
                "👨‍👩‍👧‍👦 Số thành viên: " + `${threadInfo.participantIDs.length}\n` +
                "👧 Nữ: " + `${nu}\n` +
                "👦 Nam: " + `${nam}\n` +
                "🏳️‍🌈 Bóng: " + `${bede}\n` +
                "👮 QTV: " + `${threadInfo.adminIDs.length}`,
              attachment: fs.createReadStream(__dirname + "/cache/thread.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/thread.png")
          );
        return request(encodeURI(img))
          .pipe(fs.createWriteStream(__dirname + "/cache/thread.png"))
          .on("close", () => callback());
      }
    }
  }     else return api.sendMessage("Dùng [/info box] để xem thông tin nhóm hoặc [/info user] để xem thông tin của người dùng!", event.threadID, event.messageID);
};
