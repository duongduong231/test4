module.exports.config = {
	name: "banner",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu & api: Thuận",
	description: "Tạo ảnh các thành viên trong nhóm",
	commandCategory: "group",
	usages: "girl",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.run = async function({ event, api, Currencies, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    let info = await api.getThreadInfo(event.threadID);
        let storage = [];
        for (const value of info.userInfo) storage.push({"id" : value.id, "gender": value.gender});
        let a = storage.filter(item => item.gender != undefined)
        let b = a.map(x => x.id);
  
    let ids = JSON.stringify(b.toString()).replace(/"/g,'')
    let regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    
    let res = (await axios.get(encodeURI(`https://ginxkin-api.herokuapp.com/api/fbgrimage?uid=${ids}&text=${info.threadName.replace(/"/g,'')}&outline=true&color=255,255,255${(!args[0]) ? (!regex.test(args[0])) ? "" : "" : `&background=${args[0]}`}`))).data;
    let banner = (await axios.get(`${res.link}`,{ responseType: "arraybuffer" } )).data;
    fs.writeFileSync( __dirname + "/cache/banner.png", Buffer.from(banner, "utf-8") );
    return api.sendMessage({attachment: fs.createReadStream(__dirname + `/cache/banner.png`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/banner.png`), event.messageID );
}
                                                                 