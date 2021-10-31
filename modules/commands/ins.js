module.exports.config = {
  name: "instagram",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "media",
  usages: "",
  cooldowns: 1,
  dependencies: ["axios"]
};

module.exports.run = async({api, event, args}) => {
  const axios = require('axios');
  const fs = require("fs-extra");
  const options = {
    method: 'GET',
    url: 'https://instagram-data1.p.rapidapi.com/user/info',
    params: {username: args.join("")},
    headers: {
      'x-rapidapi-key': 'cadf402147mshcb689eae6c84ecfp1501e4jsn6249b5dd4662',
      'x-rapidapi-host': 'instagram-data1.p.rapidapi.com'
    }
  };

  axios.request(options).then(async function (res) {
  let img = (await axios.get(res.data.profile_pic_url_hd, { responseType: "arraybuffer" } )).data;
  fs.writeFileSync( __dirname + "/cache/ins.png", Buffer.from(img, "utf-8") );
  return api.sendMessage({body:`Full Name: ${res.data.full_name}\nUsername: ${res.data.username}\nBio: ${res.data.biography}\nFollower: ${res.data.edge_followed_by.count}\nFollowing: ${res.data.edge_follow.count}`,attachment: fs.createReadStream(__dirname + `/cache/ins.png`)}, event.threadID, event.messageID);
    //console.log(res.data);
  }).catch(function (error) {
    console.error(error);
  return api.sendMessage("Đã có lỗi xảy ra!", event.threadID, event.messageID);
  });
}