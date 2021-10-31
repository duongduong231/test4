module.exports.config = {
	name: "hentai",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "SpermLord",
	description: "Random lấy ảnh hentai! (No Safe For Work)",
	commandCategory: "random-img",
	usages: "hentai tag",
    cooldowns: 5,
	dependencies: ['request', 'fs-extra'],
    info: [
		{
			key: "tag => Để trống",
			prompt: "Lấy danh sách các tag có",
            type: "null",
            example: ""
		},
		{
			key: "tag => tag tồn tại trong danh sách",
			prompt: "Nhập tag tồn tại để lấy ảnh đúng với chủ đề của tag!",
            type: "string",
            example: "neko"
		}
	],
};

module.exports.onLoad = () => {
    const { existsSync, createWriteStream } = require("fs-extra");
    const request = require("request");

    if (!existsSync(__dirname + "/cache/hentai.json")) request("https://raw.githubusercontent.com/catalizcs/storage-data/master/anime/anime.json")
    .pipe(createWriteStream(__dirname + "/cache/hentai.json"));
}

module.exports.run = ({ event, api, args }) => {
    const { readFileSync, createReadStream, createWriteStream, unlinkSync } = require("fs-extra");
    const request = require("request");

    let hentaiData = JSON.parse(readFileSync(__dirname + "/cache/hentai.json"));
    if (!hentaiData.hasOwnProperty(args[0])) {
        let list = [];
        Object.keys(hentaiData).forEach(endpoint => list.push(endpoint));
        return api.sendMessage(`=== Tất cả các tag của Hentai ===\n${list.join(", ")}`, event.threadID, event.messageID);
    }
    else return request(hentaiData[args[0]], (error, response, body) => {
        let picData = JSON.parse(body);
        let URL = "";
        (!picData.data) ? URL = picData.url : URL = picData.data.response.url;
        let ext = URL.substring(URL.lastIndexOf(".") + 1);
        request(URL)
        .pipe(createWriteStream(__dirname + `/cache/hentai.${ext}`))
        .on("close", () => api.sendMessage({ attachment: createReadStream(__dirname + `/cache/hentai.${ext}`) }, event.threadID, () => unlinkSync(__dirname + `/cache/hentai.${ext}`), event.messageID));
    })
}