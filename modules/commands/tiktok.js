module.exports.config = {
	name: "tiktok",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "HungCho",
	description: "",
	commandCategory: "media",
	usages: "tiktok [key]",
	cooldowns: 1,
	dependencies: ["axios","fs-extra","tiktok-scraper"],
  info: [
		{
			key: "key => info",
			prompt: "Lấy info username tiktok",
      type: "",
      example: "info banledangyeuu"
		},
    {
			key: "key => video",
			prompt: "Lấy video tiktok từ link",
      type: "",
      example: "video https://vt.tiktok.com/ZSJTTxAK5/"
		}
	],
};
module.exports.run = async({api, event, args}) => {
  const fs = require("fs-extra");
  const axios = require("axios");
  const tiktok = require('tiktok-scraper');
  var { threadID, messageID } = event;

  
  
  //if(!args[0]) return api.sendMessage("/tik [info/mp4(no logo)", threadID);
  if(args[0] == "info") {
    var info = (!args[1]) ? await tiktok.getUserProfileInfo("banledangyeuu") : await tiktok.getUserProfileInfo(args[1]);
    var name = info.user.nickname;
    var id = info.user.id;
    var username = info.user.uniqueId;
    var follower = info.stats.followerCount;
    var following = info.stats.followingCount;
    var signature = info.user.signature;      
    let Avatar = (await axios.get(`${info.user.avatarLarger}`,{ responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/tiktik-avt.png",Buffer.from(Avatar, "utf-8"));
    return api.sendMessage({body:`🐧Tên: ${name}\n❄️ID: ${id}\n💦Username: ${username}\n🐳Follower: ${follower} theo dõi\n🎀Following: ${following} đang theo dõi\n🐋Số video: ${info.stats.videoCount}\n🦋Lượt thích: ${info.stats.heartCount}\nBio: ${signature}`,attachment: fs.createReadStream(__dirname + "/cache/tiktik-avt.png")}, threadID, () => fs.unlinkSync(__dirname + "/cache/tiktik-avt.png"), messageID);	   
  } else if (args[0] == "video") {
      var res = (await axios.get(`https://godownloader.com/api/tiktok-no-watermark-free?url=${encodeURI(args[1])}&key=godownloader.com`)).data;
      var video = (await axios.get(res.video_no_watermark, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/tiktok.mp4", Buffer.from(video, "utf-8") );
      api.sendMessage({attachment: fs.createReadStream(__dirname + `/cache/tiktok.mp4`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/tiktok.mp4`), event.messageID);
    /*
    const path = __dirname + "/cache/tik.mp4";
    try {
      var {data} = await axios.get("https://savetik.cc/en/download?url="+encodeURI(args[1]));
      var link = data.split('<option value="{&#34;API&#34;: &#34;')[1].split(']}">MP4</option>')[0].split(', &#34;URL&#34;: ')[0];
      var {data : stream} = await axios.get(link,{responseType: 'arraybuffer'});
      fs.writeFileSync(path, Buffer.from(stream, 'utf-8'));
      return api.sendMessage({attachment: fs.createReadStream(path)},event.threadID, () => fs.unlinkSync(path))
    } catch {
    return api.sendMessage("Đã có lỗi xảy ra",event.threadID)
    }*/
  }
}