module.exports.config = {
	name: "porn",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "CatalizCS",
	description: "Random lấy ảnh PỎN! (No Safe For Work)",
	commandCategory: "nsfw",
	usages: "porn tag",
	cooldowns: 5,
	dependencies: ['request', 'fs-extra', 'axios', 'cheerio',"fluent-ffmpeg","@ffmpeg-installer/ffmpeg"],
	info: [{
			key: "tag => Để trống",
			prompt: "Lấy danh sách các tag có",
			type: "null",
			example: ""
		},
		{
			key: "tag => tag tồn tại trong danh sách",
			prompt: "Nhập tag tồn tại để lấy ảnh đúng với chủ đề của tag!",
			type: "string",
			example: "pornstar"
		}
	],
};
module.exports.run = ({event, api, args, __GLOBAL}) => {
	const {threadID, senderID, messageID} = event;
	const request = require('request');
	const axios = require('axios');
	const fs = require('fs-extra');
	const cheerio = require('cheerio');
	const ffmpeg = require("fluent-ffmpeg");
	const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
	ffmpeg.setFfmpegPath(ffmpegPath);
	var content = args.join(" ");
	var album = {
		'ass': "25486162",
		'bdsm': "39264341",
		'bj': "20310521",
		'boobs': "39585521",
		'cum': "55966321",
		'feet': ["9369692", "38002522"][Math.floor(Math.random() * 2)],
		'gay': "34528282",
		'pornstar': "2695091",
		'pussy': ["56533601", "29112742"][Math.floor(Math.random() * 2)],
		'sex': "282624",
		'teen': "17347221",
		'toys': "21306432"
	};
	if (!content || !album.hasOwnProperty(content)) {
		let allTags = [];
		Object.keys(album).forEach((item) => allTags.push(item));
		var pornTags = allTags.join(', ');
		return api.sendMessage('=== Tất cả các tag Porn ===\n' + pornTags + `\nSử dụng ${__GLOBAL.settings.PREFIX}porn + [tag porn] để sử dụng`, threadID, messageID);
	}
	axios.get(`https://www.pornhub.com/album/${album[content]}`).then((response) => {
		if (response.status == 200) {
			const html = response.data;
			const $ = cheerio.load(html);
			var result = [];
			let list = $('ul.photosAlbumsListing li.photoAlbumListContainer div.photoAlbumListBlock');
			list.map(index => {
				let item = list.eq(index);
				if (!item.length) return;
				let photo = `${item.find('a').attr('href')}`;
				result.push(photo);
			});

			let getURL = "https://www.pornhub.com" + result[Math.floor(Math.random() * result.length)];
			axios.get(getURL).then((response) => {
				if (response.status == 200) {
					const html = response.data;
					const $ = cheerio.load(html);
					if (content == 'sex') {
						let video = $('video.centerImageVid');
						let mp4URL = video.find('source').attr('src');
						let ext = mp4URL.substring(mp4URL.lastIndexOf('.') + 1);
						request(mp4URL).pipe(fs.createWriteStream(__dirname + `/cache/porn.${ext}`)).on('close', () => {
							ffmpeg().input(__dirname + `/cache/porn.${ext}`).toFormat("gif").pipe(fs.createWriteStream(__dirname + "/cache/porn.gif")).on("close", () => {
								return api.sendMessage({
									attachment: fs.createReadStream(__dirname + `/cache/porn.gif`)
								}, threadID, () => {
									fs.unlinkSync(__dirname + `/cache/porn.gif`);
									fs.unlinkSync(__dirname + `/cache/porn.${ext}`);
								}, messageID);
							});
						});
					} else {
						let image = $('div#photoWrapper');
						let imgURL = image.find('img').attr('src');
						let ext = imgURL.substring(imgURL.lastIndexOf('.') + 1);
						return request(imgURL).pipe(fs.createWriteStream(__dirname + `/cache/porn.${ext}`)).on('close', () => api.sendMessage({
							attachment: fs.createReadStream(__dirname + `/cache/porn.${ext}`)
						}, threadID, () => fs.unlinkSync(__dirname + `/cache/porn.${ext}`), messageID));
					}
				}
			}, (error) => console.log(error));
		} else return api.sendMessage("Đã xảy ra lỗi!", threadID, messageID);
	}, (error) => console.log(error));
}