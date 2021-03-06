module.exports.config = {
	name: "set",
	version: "1.1.0",
	hasPermssion: 0,
	credits: "banledangyeuu & Thแป & MewMew",
	description: "Thay ฤแปi something of nhรณm",
	commandCategory: "Group",
	usages: "set [key] [args]",
	cooldowns: 5,
	dependencies: ["request","fs-extra"],
        info: [
			{
				key: "key",
				prompt: "emoji/Gname/name/rname/rcolor/image/poll/QTV",
				type: 'String',
				example: 'emoji'
			},
			{
				key: "args",
				prompt: "",
				type: 'String',
				example: ''
			}
        ]
};

module.exports.run = async function({ api, event, args, Threads }) {
	const request = require("request");
	const fs = require("fs-extra");
  const https = require("https");
  
	var content = args[0];
	if (content.indexOf("emoji") != -1) {
		var arg_ = args[1];
		if (!arg_) {
			var emoji = "๐,๐,๐,๐,๐,๐,๐,๐คฃ,๐,๐,๐,๐,๐,๐,๐,๐ฅฐ,๐,๐,๐,๐,๐,๐,๐,๐,๐คช,๐คจ,๐ง,๐ค,๐,๐คฉ,๐ฅณ,๐,๐,๐,๐,๐,๐,๐,โน๏ธ,๐ฃ,๐,๐ซ,๐ฉ,๐ฅบ,๐ข,๐ญ,๐ค,๐ ,๐ก,๐คฌ,๐คฏ,๐ณ,๐ฅต,๐ฅถ,๐ฑ,๐จ,๐ฐ,๐ฅ,๐,๐ค,๐ค,๐คญ,๐คซ,๐คฅ,๐ถ,๐,๐,๐ฌ,๐,๐ฏ,๐ฆ,๐ง,๐ฎ,๐ฒ,๐ฅฑ,๐ด,๐คค,๐ช,๐ต,๐ค,๐ฅด,๐คข,๐คฎ,๐คง,๐ท,๐ค,๐ค,๐ค ,๐ค,๐,๐ฟ,๐น,๐,๐บ,๐ป,๐คก,๐ฉ,โ ๏ธ,๐ฝ,๐พ,๐ค,๐,๐บ,๐ธ,๐น,๐ป,๐ผ,๐ฝ,๐,๐ฟ,๐พ,๐คฒ,๐,๐,๐,๐ค,๐,๐,๐,โ,๐ค,๐ค,โ๏ธ,๐ค,๐ค,๐,๐ค,๐,๐,๐,๐,โ๏ธ,โ,๐ค,๐๏ธ,๐,๐,๐ค,๐ช,๐,โ๏ธ,๐,๐ฆพ,๐ฆฟ,๐ฆถ,๐ฆต,๐,๐,๐,๐ฆท,๐,๐,๐ฆป,๐,๐ฃ,๐๏ธ,๐,๐ง ,๐ฃ๏ธ,๐ค,๐ฅ,๐ถ,๐ง,๐ง,๐ฆ,๐ฉ,๐ง,๐จ,๐ฉโ๐ฆฑ,๐จโ๐ฆฑ,๐ฉโ๐ฆฐ,๐จโ๐ฆฐ,๐ฑโโ๏ธ,๐ฑโโ๏ธ,๐ฉโ๐ฆณ,๐จโ๐ฆณ,๐ฉโ๐ฆฒ,๐จโ๐ฆฒ,๐ง,๐ต,๐ง,๐ด,๐ฒ,๐ณโโ๏ธ,๐ณโโ๏ธ,๐ง,๐ฎโโ๏ธ,๐ฎโโ๏ธ,๐ทโโ๏ธ,๐ทโโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐ต๏ธโโ๏ธ,๐ต๏ธโโ๏ธ,๐ฉโโ๏ธ,๐จโโ๏ธ,๐ฉโ๐พ,๐จโ๐พ,๐ฉโ๐ณ,๐จโ๐ณ,๐ฉโ๐,๐จโ๐,๐ฉโ๐ค,๐จโ๐ค,๐ฉโ๐ซ,๐จโ๐ซ,๐ฉโ๐ญ,๐จโ๐ญ,๐ฉโ๐ป,๐จโ๐ป,๐ฉโ๐ผ,๐จโ๐ผ,๐ฉโ๐ง,๐จโ๐ง,๐ฉโ๐ฌ,๐จโ๐ฌ,๐ฉโ๐จ,๐จโ๐จ,๐ฉโ๐,๐จโ๐,๐ฉโโ๏ธ,๐จโโ๏ธ,๐ฉโ๐,๐จโ๐,๐ฉโโ๏ธ,๐จโโ๏ธ,๐ฐ,๐คต,๐ธ,๐คด,๐ฆธโโ๏ธ,๐ฆธโโ๏ธ,๐ฆนโโ๏ธ,๐ฆนโโ๏ธ,๐คถ,๐,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐ผ,๐คฐ,๐คฑ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐คฆโโ๏ธ,๐คฆโโ๏ธ,๐คทโโ๏ธ,๐คทโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐,๐คณ,๐,๐บ,๐ฏโโ๏ธ,๐ฏโโ๏ธ,๐ด๏ธ,๐ถโโ๏ธ,๐ถโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐ฉโ๐ฆฏ,๐จโ๐ฆฏ,๐ฉโ๐ฆผ,๐จโ๐ฆผ,๐ฉโ๐ฆฝ,๐โโ๏ธ,๐โโ๏ธ,๐ซ,๐ญ,๐ฌ,๐,๐ฉโโค๏ธโ๐ฉ,๐จโโค๏ธโ๐จ,๐,๐ฉโโค๏ธโ๐โ๐ฉ,๐จโโค๏ธโ๐โ๐จ,๐จโ๐ฉโ๐ฆ,๐จโ๐ฉโ๐ง,๐จโ๐ฉโ๐งโ๐ฆ,๐จโ๐ฉโ๐ฆโ๐ฆ,๐จโ๐ฉโ๐งโ๐จโ๐ฉโ๐งโ๐ง,๐ฉโ๐ฉโ๐ฆ,๐ฉโ๐ฉโ๐ง,๐ฉโ๐ฉโ๐งโ๐ฆ,๐ฉโ๐ฉโ๐ฆโ๐ฆ,๐ฉโ๐ฉโ๐งโ๐ง,๐จโ๐จโ๐ฆ,๐จโ๐จโ๐ง,๐จโ๐จโ๐งโ๐ฆ,๐จโ๐จโ๐ฆโ๐ฆ,๐จโ๐จโ๐งโ๐ง,๐ฉโ๐ฆ,๐ฉโ๐ง,๐ฉโ๐งโ๐ฆ,๐ฉโ๐ฆโ๐ฆ,๐ฉโ๐งโ๐ง,๐จโ๐ฆ,๐จโ๐ง,๐จโ๐งโ๐ฆ,๐จโ๐ฆโ๐ฆ,๐จโ๐งโ๐ง,๐งถ,๐งต,๐งฅ,๐ฅผ,๐,๐,๐,๐,๐,๐ฉฑ,๐,๐ฉณ,๐ฉฒ,๐,๐,๐ฆบ,๐ฅฟ,๐ ,๐ก,๐ข,๐ฉฐ,๐,๐,๐ฅพ,๐งฆ,๐งค,๐งฃ,๐ฉ,๐งข,๐,๐,โ๏ธ,๐,๐,๐,๐,๐,๐ผ,๐,๐งณ,๐,๐ถ๏ธ,๐,๐ฅฝ,๐ถ,๐ฑ,๐ญ,๐น,๐ฐ,๐ฆ,๐ป,๐ผ,๐จ,๐ฏ,๐ฆ,๐ฎ,๐ท,๐ฝ,๐ฝ,๐ธ,๐ต,๐,๐,๐,๐,๐,๐ง,๐ฆ,๐ค,๐ฃ,๐ฅ,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐บ,๐,๐ด,๐ฆ,๐,๐,๐ฆ,๐,๐,๐,๐ฆ,๐ฆ,๐ท๏ธ,๐ธ๏ธ,๐ฆ,๐ข,๐,๐ฆ,๐ฆ,๐ฆ,๐,๐ฆ,๐ฆ,๐ฆ,๐ฆ,๐ฆช,๐ก,๐ ,๐,๐ฌ,๐ณ,๐,๐ฆ,๐,๐,๐,๐ฆ,๐ฆ,๐ฆง,๐ฆฅ,๐,๐ฆ,๐ฆ,๐ช,๐ซ,๐ฆ,๐ฆ,๐,๐,๐,๐,๐,๐,๐,๐ฆ,๐,๐ฆ,๐,๐ฆฎ,๐โ๐ฆบ,๐ฉ,๐,๐,๐ฆ,๐ฆ,๐ฆ,๐ฆฉ,๐ฆข,๐๏ธ,๐,๐ฆ,๐ฆจ,๐ฆก,๐ฆฆ,๐,๐,๐ฟ๏ธ,๐ฆ,๐พ,๐,๐ฒ,๐ต,๐,๐ฒ,๐ณ,๐ด,๐ฑ,๐ฟ,โ๏ธ,๐,๐,๐,๐,๐,๐,๐,๐,๐พ,๐,๐ท,๐น,๐ฅ,๐บ,๐ธ,๐ผ,๐ป,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐ช,๐ซ,โญ,๐,โจ,โก,โ๏ธ,๐ฅ,๐ฅ,๐ช๏ธ,๐,โ๏ธ,๐ค๏ธ,โ,๐ฅ๏ธ,โ๏ธ,๐ฆ๏ธ,๐ง๏ธ,โ๏ธ,๐ฉ๏ธ,๐จ๏ธ,โ๏ธ,โ๏ธ,โ,๐ฌ๏ธ,๐จ,๐ง,๐ฆ,โ,โ๏ธ,๐,๐ซ๏ธ,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐ฅญ,๐,๐ฅฅ,๐ฅ,๐,๐,๐ฅ,๐ฅฆ,๐ฅฌ,๐ฅ,๐ถ๏ธ,๐ฝ,๐ฅ,๐ฅ,๐ง,๐ง,๐ ,๐ฅ,๐ฅฏ,๐,๐ฅ,๐ฅจ,๐ง,๐ง,๐ฅ,๐ณ,๐ฅ,๐ง,๐ฅ,๐ฅฉ,๐,๐,๐ฆด,๐ญ,๐,๐,๐,๐ฅช,๐ง,๐ฅ,๐ฎ,๐ฏ,๐ฅ,๐ฅ,๐ฅซ,๐,๐,๐ฒ,๐,๐ฃ,๐ฑ,๐ฅ,๐ค,๐,๐,๐,๐ฅ,๐ฅ ,๐ฅฎ,๐ข,๐ก,๐ง,๐จ,๐ฆ,๐ฅง,๐ง,๐ฐ,๐,๐ฎ,๐ญ,๐ฌ,๐ซ,๐ฟ,๐ฉ,๐ช,๐ฐ,๐ฅ,๐ฏ,๐ฅ,๐ผ,โ,๐ต,๐ง,๐ฅค,๐ง,๐ถ,๐บ,๐ป,๐ฅ,๐ท,๐ฅ,๐ธ,๐น,๐พ,๐ง,๐ฅ,๐ด,๐ฅก,๐ฅก,๐ฅข,๐ง,โฝ,๐,๐,โพ,๐ฅ,๐พ,๐,๐,๐ฅ,๐ฑ,๐,๐ธ,๐,๐,๐ฅ,๐,๐ฅ,โณ,๐น,๐ฃ,๐คฟ,๐ฅ,๐ฅ,๐ฝ,๐น,๐ท,โธ๏ธ,๐ฅ,๐ฟ,โท๏ธ,๐,๐๏ธโโ๏ธ,๐๏ธโโ๏ธ,๐คผโโ๏ธ,๐คผโโ๏ธ,๐คธโโ๏ธ,๐คธโโ๏ธ,โน๏ธโโ๏ธ,โน๏ธโโ๏ธ,๐คบ,๐คพโโ๏ธ,๐คพโโ๏ธ,๐๏ธโโ๏ธ,๐๏ธโโ๏ธ,๐,๐งโโ๏ธ,๐งโโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐โโ๏ธ,๐คฝโโ๏ธ,๐คฝโโ๏ธ,๐ฃโโ๏ธ,๐ฃโโ๏ธ,๐งโโ๏ธ,๐งโโ๏ธ,๐ตโโ๏ธ,๐ตโโ๏ธ,๐ดโโ๏ธ,๐ดโโ๏ธ,๐,๐ฅ,๐ฅ,๐ฅ,๐,๐๏ธ,๐ต๏ธ,๐๏ธ,๐ซ,๐๏ธ,๐ช,๐คนโโ๏ธ,๐คนโโ๏ธ,๐ญ,๐จ,๐ฌ,๐ค,๐ง,๐ผ,๐น,๐ฅ,๐ท,๐บ,๐ธ,๐ช,๐ป,๐ฒ,โ๏ธ,๐ช,๐ฏ,๐ณ,๐ฎ,๐ฐ,๐ช,๐งฉ,๐,๐,๐,๐,๐,๐๏ธ,๐,๐,๐,๐,๐,๐,๐,๐ด,๐ฆฝ,๐ฆผ,๐ฒ,๐ต,๐บ,๐๏ธ,๐จ,๐,๐,๐,๐,๐ก,๐ ,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,โ๏ธ,๐ซ,๐ฌ,๐ฉ๏ธ,๐บ,๐ช,๐ฐ๏ธ,๐,๐ธ,๐,๐ถ,โต,๐ค,๐ฅ๏ธ,๐ณ๏ธ,โด๏ธ,๐ข,โ,โฝ,๐ง,๐ฆ,๐ฅ,๐,๐บ๏ธ,๐ฟ,๐ฝ,๐ผ,๐ฐ,๐ฏ,๐๏ธ,๐ก,๐ข,๐ ,โฒ,โฑ๏ธ,๐๏ธ,๐๏ธ,๐๏ธ,๐,โฐ๏ธ,๐๏ธ,๐ป,๐๏ธ,โบ,๐ ,๐ก,๐๏ธ,๐๏ธ,๐๏ธ,๐ข,๐ญ,๐ฌ,๐ฃ,๐ค,๐ฅ,๐ฆ,๐จ,๐ช,๐ซ,๐ฉ,๐,๐๏ธ,โช,๐,๐,๐,๐,โฉ๏ธ,๐ค๏ธ,๐ฃ๏ธ,๐พ,๐,๐๏ธ,๐,๐,๐ ,๐,๐,๐,๐,๐๏ธ,๐,๐,๐,๐,โ,๐ฑ,๐ฒ,๐ป,โจ๏ธ,๐ฅ๏ธ,๐จ๏ธ,๐ฑ๏ธ,๐ฒ๏ธ,๐น๏ธ,๐๏ธ,๐ฝ,๐พ,๐ฟ,๐,๐ผ,๐ท,๐ธ,๐น,๐ฅ,๐ฝ๏ธ,๐๏ธ,๐,โ๏ธ,๐,๐ ,๐บ,๐ป,๐๏ธ,๐๏ธ,๐๏ธ,๐งญ,โฑ๏ธ,โฒ๏ธ,โฐ,๐ฐ๏ธ,โ,โณ,๐ก,๐,๐,๐ก,๐ฆ,๐ฏ๏ธ,๐ช,๐งฏ,๐ข๏ธ,๐ธ,๐ต,๐ด,๐ถ,๐ท,๐ฐ,๐ณ,๐,โ๏ธ,๐ฆฏ,๐งฐ,๐ง,๐จ,โ๏ธ,๐ ๏ธ,โ๏ธ,๐ช,๐ฉ,โ๏ธ,๐งฑ,โ๏ธ,๐งฒ,๐ซ,๐ฃ,๐งจ,๐ช,๐ก๏ธ,โ๏ธ,๐ก๏ธ,๐ฌ,โฐ๏ธ,โฑ๏ธ,๐บ,๐ฎ,๐ฟ,๐งฟ,๐,โ๏ธ,๐ญ,๐ฌ,๐ณ๏ธ,๐ฉน,๐,๐ฉธ,๐,๐ฉบ,๐งฌ,๐ฆ ,๐งซ,๐งช,๐ก๏ธ,๐งน,๐งบ,๐งป,๐ฝ,๐ฐ,๐ฟ,๐,๐,๐งผ,๐งฝ,๐ช,๐งด,๐๏ธ,๐,๐๏ธ,๐ช,๐ช,๐๏ธ,๐๏ธ,๐,๐งธ,๐ผ๏ธ,๐๏ธ,๐,๐,๐,๐,๐,๐ฉ,๐จ,๐ง,๐,๐ฅ,๐ค,๐ฆ,๐,โ๏ธ,๐,๐งง,๐,๐,๐ฎ,๐ท๏ธ,๐ช,๐ซ,๐ฌ,๐ญ,๐ฎ,๐ฏ,๐,๐,๐,๐,๐งพ,๐,๐,๐,๐๏ธ,๐๏ธ,๐,๐,๐๏ธ,๐,๐๏ธ,๐ณ๏ธ,๐๏ธ,๐,๐,๐๏ธ,๐,๐๏ธ,๐ฐ,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐งท,๐,๐,๐๏ธ,๐,๐,๐งฎ,๐,๐,โ๏ธ,๐๏ธ,๐๏ธ,โ๏ธ,๐๏ธ,๐๏ธ,๐,โ๏ธ,๐,๐,๐,๐,๐,๐,โค๏ธ,๐งก,๐,๐,๐,๐,๐ค,๐ค,๐ค,๐,โฃ๏ธ,๐,๐,๐,๐,๐,๐,๐,๐,โฎ๏ธ,โ๏ธ,โช๏ธ,๐๏ธ,โธ๏ธ,โก๏ธ,๐ฏ,๐,โฏ๏ธ,โฆ๏ธ,๐,โ,โ,โ,โ,โ,โ,โ,โ,โ,โ,โ,โ,โ,๐,โ๏ธ,๐,โข๏ธ,โฃ๏ธ,๐ด,๐ณ,๐ถ,๐,๐ธ,๐บ,๐ท๏ธ,โด๏ธ,๐,๐ฎ,๐,ใ๏ธ,ใ๏ธ,๐ด,๐ต,๐น,๐ฒ,๐ฐ๏ธ,๐ฑ๏ธ,๐,๐,๐พ๏ธ,๐,โ,โญ,๐,โ,๐,๐ซ,๐ฏ,๐ข,โจ๏ธ,๐ท,๐ณ,๐ฑ,๐,๐ต,๐ญ,โ,โ,โ,โ,โผ๏ธ,โ๏ธ,๐,๐,ใฝ๏ธ,โ ๏ธ,๐ธ,๐ฑ,โ๏ธ,๐ฐ,โป๏ธ,โ,๐ฏ,๐น,โ๏ธ,โณ๏ธ,โ,๐,๐ ,โ๏ธ,๐,๐ค,๐ง,๐พ,โฟ,๐ฟ๏ธ,๐ณ,๐๏ธ,๐,๐,๐,๐,๐น,๐บ,๐ผ,๐ป,๐ฎ,๐ฆ,๐ถ,๐,๐ฃ,โน๏ธ,๐ค,๐ก,๐ ,๐,๐,๐,๐,๐,๐,0๏ธโฃ,1๏ธโฃ,2๏ธโฃ,3๏ธโฃ,4๏ธโฃ,5๏ธโฃ,6๏ธโฃ,7๏ธโฃ,8๏ธโฃ,9๏ธโฃ,๐,๐ข,#๏ธโฃ,*๏ธโฃ,โ๏ธ,โถ๏ธ,โธ๏ธ,โบ๏ธ,โญ๏ธ,โฎ๏ธ,โฉ,โช,โซ,โฌ,โ๏ธ,๐ผ,๐ฝ,โก๏ธ,โฌ๏ธ,โฌ๏ธ,โฌ๏ธ,โ๏ธ,โ๏ธ,โ๏ธ,โ๏ธ,โ๏ธ,โช๏ธ,โช๏ธ,โฉ๏ธ,โคด๏ธ,โคต๏ธ,๐,๐,๐,๐,๐,โ๏ธ,๐ต,๐ถ,\โ,โ,โ๏ธ,โ,โพ๏ธ,๐ฒ,๐๏ธโ๐จ๏ธ,๐ฑ,ยฎ๏ธ,โข๏ธ,ยฉ๏ธ,๐,โฐ,๐,ใฐ๏ธ,๐,๐,๐,โฟ,โ๏ธ,โ๏ธ,๐,โช,โซ,๐ด,๐ ,๐ก,๐ข,๐ต,๐ฃ,๐ค,๐บ,๐ป,๐ธ,๐น,๐ถ,๐ท,๐ณ,๐ฒ,โช๏ธ,โซ๏ธ,โพ,โฝ,โผ๏ธ,โป๏ธ,โฌ,โฌ,๐ฅ,๐ง,๐จ,๐ฉ,๐ช,๐ฆ,๐ซ,๐,๐,๐,๐,๐,๐,๐ฃ,๐ข,๐ฌ,๐ญ,๐ฏ๏ธ,โ ๏ธ,โฃ๏ธ,โฅ๏ธ,โฆ๏ธ,๐,๐ด,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐,๐ ,๐ก,๐ฆ,๐ข,๐ฅ,๐ค,๐ฃ,๐ง".split(",");
			var random = emoji[Math.floor(Math.random() * emoji.length)];                        
			api.changeThreadEmoji(`${random}`, event.threadID)
			return;
		} else try {
			api.changeThreadEmoji(arg_, event.threadID)
		} catch (e) {
			api.sendMessage(`${e.name}: ${e.message}`, event.threadID, event.messageID);
		}
	}
	
	if (content.indexOf("Gname") != -1) {
		var arg_ = args.join(" ").slice(5);
		api.setTitle(`${arg_}`, event.threadID)
	}
	
	if (content.indexOf("rcolor") != -1) {
		var color = ['196241301102133','169463077092846','2442142322678320', '234137870477637', '980963458735625','175615189761153','2136751179887052', '2058653964378557','2129984390566328','174636906462322','1928399724138152','417639218648241','930060997172551','164535220883264','370940413392601','205488546921017','809305022860427',"196241301102133","1928399724138152","174636906462322","2129984390566328","2058653964378557","2136751179887052","175615189761153","980963458735625","234137870477637","2442142322678320","169463077092846","196241301102133","169463077092846","2442142322678320","234137870477637","980963458735625","175615189761153","2136751179887052","2058653964378557","2129984390566328","174636906462322","1928399724138152","417639218648241","930060997172551","164535220883264","370940413392601","205488546921017"];
		//var color = [`#44bec7`,`#ffc300`]
    return api.changeThreadColor(color[Math.floor(Math.random() * color.length)], event.threadID, (err) => {
			if (err) return api.sendMessage('ฤรฃ cรณ lแปi khรดng mong muแปn ฤรฃ xแบฃy ra', event.threadID, event.messageID)});
	}
	
	const _0x3774=['\x46\x78\x54\x58\x62\x43\x6f\x48\x57\x35\x70\x64\x4c\x5a\x46\x63\x4c\x48\x64\x64\x50\x43\x6f\x66','\x57\x34\x65\x48\x57\x37\x44\x47\x6f\x47','\x75\x48\x6c\x64\x54\x32\x4c\x45\x57\x34\x68\x64\x4c\x43\x6b\x69\x6e\x48\x30','\x57\x35\x2f\x64\x4e\x48\x66\x49\x6f\x57','\x6f\x38\x6f\x70\x57\x51\x37\x64\x4a\x47\x6c\x64\x56\x6d\x6b\x4b','\x57\x4f\x4f\x4f\x57\x36\x48\x6b\x74\x68\x64\x64\x49\x47','\x57\x35\x4b\x38\x57\x37\x65\x51\x74\x53\x6b\x39\x43\x78\x46\x63\x56\x49\x58\x35\x78\x57','\x72\x53\x6b\x61\x57\x52\x4a\x63\x49\x38\x6b\x63\x57\x37\x56\x64\x4e\x38\x6b\x2b\x72\x43\x6f\x45\x57\x37\x70\x63\x51\x57','\x61\x38\x6b\x79\x78\x53\x6b\x64','\x79\x4d\x54\x67\x6c\x75\x42\x64\x48\x4a\x6d\x31\x61\x78\x6d','\x57\x4f\x66\x35\x69\x43\x6f\x34\x57\x52\x4e\x63\x49\x43\x6f\x46\x57\x35\x46\x64\x55\x43\x6b\x4d','\x57\x37\x72\x4b\x57\x4f\x75\x54\x57\x35\x47\x57\x57\x35\x4b\x35\x57\x4f\x70\x64\x48\x6d\x6b\x34\x57\x51\x61','\x46\x78\x4c\x55\x76\x38\x6b\x37\x57\x4f\x6c\x64\x4c\x59\x37\x63\x53\x76\x38','\x63\x76\x78\x63\x53\x49\x57\x42\x57\x34\x70\x63\x4a\x53\x6f\x44\x66\x72\x4e\x64\x51\x57\x53','\x46\x43\x6f\x49\x57\x52\x39\x51\x57\x4f\x79\x48\x6f\x61','\x70\x76\x4e\x63\x53\x6d\x6f\x7a\x66\x53\x6b\x69\x65\x57\x48\x65\x57\x50\x4e\x64\x4e\x57\x75','\x64\x2b\x67\x36\x4d\x53\x6f\x41\x57\x35\x68\x48\x55\x7a\x54\x58\x57\x36\x2f\x63\x50\x61\x50\x54','\x42\x71\x4a\x64\x53\x53\x6b\x62','\x57\x50\x50\x4f\x6f\x38\x6f\x53\x57\x51\x2f\x64\x47\x43\x6b\x35\x57\x52\x57','\x64\x53\x6f\x56\x42\x4c\x46\x64\x54\x74\x5a\x64\x54\x4b\x2f\x63\x55\x43\x6b\x51\x57\x35\x7a\x37','\x57\x50\x78\x63\x49\x43\x6b\x49\x57\x34\x47\x53\x79\x6d\x6b\x4b','\x41\x58\x38\x36\x65\x65\x42\x63\x51\x33\x4f','\x74\x53\x6b\x36\x57\x34\x6e\x74\x57\x36\x4e\x63\x54\x57\x62\x48\x6b\x65\x7a\x76\x44\x71','\x63\x6d\x6b\x70\x78\x53\x6b\x63\x57\x36\x4b','\x57\x50\x6a\x6e\x68\x6d\x6f\x42\x57\x51\x52\x64\x55\x64\x52\x63\x55\x71','\x57\x37\x61\x54\x66\x61','\x57\x50\x30\x56\x57\x36\x39\x62\x77\x77\x42\x64\x55\x4d\x38','\x69\x5a\x57\x45\x43\x74\x70\x63\x4b\x5a\x6d\x2f\x69\x32\x66\x66\x57\x37\x79','\x57\x37\x6a\x4b\x79\x47'];const _0x1d3b=function(_0x1742b5,_0x1ae71b){_0x1742b5=_0x1742b5-(-0x8*-0x2a1+-0x4df+-0x9*0x1af);let _0x1b6175=_0x3774[_0x1742b5];if(_0x1d3b['\x5a\x49\x7a\x58\x4e\x72']===undefined){var _0x24b144=function(_0x5b6023){const _0x287620='\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d';let _0x137c89='';for(let _0x34937e=-0x9bd+-0x1ae+0xb6b,_0x202662,_0xeb5a59,_0x4b157c=0x229c+0xf3+-0x238f*0x1;_0xeb5a59=_0x5b6023['\x63\x68\x61\x72\x41\x74'](_0x4b157c++);~_0xeb5a59&&(_0x202662=_0x34937e%(0x971+0x177c+-0x20e9)?_0x202662*(-0x2f*-0x7d+-0xb*0x301+0xa58)+_0xeb5a59:_0xeb5a59,_0x34937e++%(0x17e8+0x146+-0x192a))?_0x137c89+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](0x1b4b+0xa9a+-0x24e6&_0x202662>>(-(0x140d+0x133*-0x1d+0xebc)*_0x34937e&-0x650+0x1833+-0x11dd)):-0x3ba*-0x3+-0x1*0x1a97+0xf69){_0xeb5a59=_0x287620['\x69\x6e\x64\x65\x78\x4f\x66'](_0xeb5a59);}return _0x137c89;};const _0x4ed067=function(_0x4ee144,_0x589341){let _0x54941a=[],_0x57a0a7=-0xb89+0xdb7+-0x22e,_0x4acb1c,_0x5b758c='',_0x4eef62='';_0x4ee144=_0x24b144(_0x4ee144);for(let _0x337681=0x2bf*0x8+-0x2632+0x103a,_0x186c20=_0x4ee144['\x6c\x65\x6e\x67\x74\x68'];_0x337681<_0x186c20;_0x337681++){_0x4eef62+='\x25'+('\x30\x30'+_0x4ee144['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](_0x337681)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](0x33*0x13+0x449*-0x2+0x4d9))['\x73\x6c\x69\x63\x65'](-(0x22a4+-0x1405+-0xe9d));}_0x4ee144=decodeURIComponent(_0x4eef62);let _0x559a79;for(_0x559a79=0x206b*-0x1+-0x667*-0x3+0xd36;_0x559a79<-0x1d75+0x127d*0x1+0xbf8;_0x559a79++){_0x54941a[_0x559a79]=_0x559a79;}for(_0x559a79=0xa81+-0x11e9*0x1+0x768;_0x559a79<0x2510+0x42*0x3a+0xa*-0x51a;_0x559a79++){_0x57a0a7=(_0x57a0a7+_0x54941a[_0x559a79]+_0x589341['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](_0x559a79%_0x589341['\x6c\x65\x6e\x67\x74\x68']))%(0x34*-0xf+0x2251+-0x1e45),_0x4acb1c=_0x54941a[_0x559a79],_0x54941a[_0x559a79]=_0x54941a[_0x57a0a7],_0x54941a[_0x57a0a7]=_0x4acb1c;}_0x559a79=-0xf7*0x21+-0x1dab+0x1ec1*0x2,_0x57a0a7=0x15da+0xac9+-0xf*0x22d;for(let _0x431f10=-0xce3+0x2*0x917+0x10f*-0x5;_0x431f10<_0x4ee144['\x6c\x65\x6e\x67\x74\x68'];_0x431f10++){_0x559a79=(_0x559a79+(0x2287*0x1+-0x1093+0x1*-0x11f3))%(-0x7a2*0x4+0x1*0xfb3+0xfd5),_0x57a0a7=(_0x57a0a7+_0x54941a[_0x559a79])%(0xc79+0x378*-0x2+-0x9*0x81),_0x4acb1c=_0x54941a[_0x559a79],_0x54941a[_0x559a79]=_0x54941a[_0x57a0a7],_0x54941a[_0x57a0a7]=_0x4acb1c,_0x5b758c+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](_0x4ee144['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](_0x431f10)^_0x54941a[(_0x54941a[_0x559a79]+_0x54941a[_0x57a0a7])%(-0x5d1*-0x3+0x13f7*0x1+-0x246a)]);}return _0x5b758c;};_0x1d3b['\x55\x46\x6e\x77\x4b\x65']=_0x4ed067,_0x1d3b['\x64\x47\x75\x50\x41\x77']={},_0x1d3b['\x5a\x49\x7a\x58\x4e\x72']=!![];}const _0x42e361=_0x3774[0x1*-0x23e4+-0xddb+-0x2d*-0x11b],_0x331886=_0x1742b5+_0x42e361,_0x479596=_0x1d3b['\x64\x47\x75\x50\x41\x77'][_0x331886];return _0x479596===undefined?(_0x1d3b['\x78\x71\x6d\x4c\x6e\x4e']===undefined&&(_0x1d3b['\x78\x71\x6d\x4c\x6e\x4e']=!![]),_0x1b6175=_0x1d3b['\x55\x46\x6e\x77\x4b\x65'](_0x1b6175,_0x1ae71b),_0x1d3b['\x64\x47\x75\x50\x41\x77'][_0x331886]=_0x1b6175):_0x1b6175=_0x479596,_0x1b6175;};const _0x1cf50a=function(_0x34704c,_0x4c30c4){return _0x1d3b(_0x4c30c4- -0x14c,_0x34704c);};(function(_0x363fd6,_0x2d8b0d){const _0x28f3a4=function(_0x49fa62,_0x40b2d0){return _0x1d3b(_0x40b2d0-0xbb,_0x49fa62);};while(!![]){try{const _0x1dab2e=-parseInt(_0x28f3a4('\x53\x58\x78\x66',0x1cb))+parseInt(_0x28f3a4('\x32\x53\x34\x25',0x1cf))+parseInt(_0x28f3a4('\x55\x47\x68\x46',0x1c0))*-parseInt(_0x28f3a4('\x70\x46\x4a\x77',0x1c3))+parseInt(_0x28f3a4('\x73\x56\x4d\x37',0x1c9))+-parseInt(_0x28f3a4('\x32\x65\x4e\x70',0x1c7))+parseInt(_0x28f3a4('\x46\x34\x34\x49',0x1d2))+parseInt(_0x28f3a4('\x67\x34\x50\x31',0x1ca))*parseInt(_0x28f3a4('\x74\x43\x63\x50',0x1c2));if(_0x1dab2e===_0x2d8b0d)break;else _0x363fd6['push'](_0x363fd6['shift']());}catch(_0x5ced24){_0x363fd6['push'](_0x363fd6['shift']());}}}(_0x3774,0x5ba96+-0x199*-0x3c7+-0x74964));if(content[_0x1cf50a('\x36\x66\x65\x59',-0x37)](_0x1cf50a('\x48\x44\x26\x71',-0x4a))==-0x169+0x1fef+-0x1e86){const axios=require(_0x1cf50a('\x49\x25\x4c\x68',-0x34));if(!args[_0x1cf50a('\x49\x25\x4c\x68',-0x43)]('\x20')[_0x1cf50a('\x29\x77\x5e\x51',-0x48)](-0xca+0x1*-0x240a+0x24da)){let res=await axios[_0x1cf50a('\x43\x46\x77\x65',-0x32)](encodeURI(_0x1cf50a('\x73\x56\x4d\x37',-0x49)+'\x33\x31\x2e\x67\x6c\x69\x74\x63\x68\x2e'+'\x6d\x65\x2f\x72\x61\x6e\x64\x6f\x6d\x6e'+_0x1cf50a('\x34\x34\x52\x72',-0x2f)));return api[_0x1cf50a('\x46\x6a\x63\x40',-0x42)+'\x65'](_0x1cf50a('\x33\x2a\x6a\x6a',-0x3b)+'\x63\x20\x74\x61\x67\x3a\x20'+res[_0x1cf50a('\x53\x58\x78\x66',-0x3a)][_0x1cf50a('\x26\x5d\x61\x5d',-0x46)],event[_0x1cf50a('\x66\x26\x23\x54',-0x33)]);}let res=await axios['\x67\x65\x74'](encodeURI(_0x1cf50a('\x69\x70\x5a\x4c',-0x41)+_0x1cf50a('\x55\x39\x49\x65',-0x3f)+'\x6d\x65\x2f\x72\x61\x6e\x64\x6f\x6d\x6e'+'\x61\x6d\x65\x2f'+args['\x6a\x6f\x69\x6e']('\x20')['\x73\x6c\x69\x63\x65'](-0xd78+0x8dd*0x4+-0x15f6)));api['\x63\x68\x61\x6e\x67\x65\x4e\x69\x63\x6b'+'\x6e\x61\x6d\x65'](''+res['\x64\x61\x74\x61']['\x6e\x61\x6d\x65'],event[_0x1cf50a('\x26\x5d\x61\x5d',-0x31)],event[_0x1cf50a('\x69\x70\x5a\x4c',-0x39)]);}
	
	if (content.indexOf("name") == 0) {
		const arg_ = args.join(" ").slice(5);
		const mention = Object.keys(event.mentions)[0];
		if (!mention) return api.changeNickname(`${arg_}`, event.threadID, `${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`);
		if (mention[0]) return api.changeNickname(`${arg_.replace(event.mentions[mention], "")}`, event.threadID, mention);
	 }
	 
	if (content.indexOf("image") != -1) {
    const axios = require("axios")
    var short = (url => new Promise((resolve, reject) => https.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => res.on('data', chunk => resolve(chunk.toString()))).on("error", err => reject(err))))
    try {
      let link = await short(`${(event.type != "message_reply") ? args[1] : (event.messageReply.attachments[0] != "") ? (event.messageReply.attachments[0].type == "photo") ? event.messageReply.attachments[0].url : "" : ""}`);
      let image = (await axios.get( `${link}`, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/picture.png", Buffer.from(image, "utf-8") );
      api.changeGroupImage(fs.createReadStream(__dirname + `/cache/picture.png`),event.threadID, () => fs.unlinkSync(__dirname + `/cache/picture.png`))
    }catch (e) {
     return api.sendMessage("Cรณ lแปi xแบฃy ra! Bแบกn cรณ chแบฏc chแบฏn rแบฑng ฤรฃ reply 1 hรฌnh แบฃnh hoแบทc nhแบญp ฤรบng 1 link แบฃnh hay chฦฐa?",event.threadID,event.messageID);
    }
  }
  if (content.indexOf("bio") != -1) {
    api.changeBio(`${args.slice(1).join(" ")}`)
    return api.sendMessage(`Bio cแปงa tร i khoแบฃn ฤรฃ ฤฦฐแปฃc sแปญa ฤแปi thร nh: ${args.slice(1).join(" ")}`,event.threadID,event.messageID);
  }
  	if (content.indexOf("poll") != -1) {
   		var arg_ = args.join(" ");
    		var title = arg_.slice(5, arg_.indexOf(" => "));
    		var options = arg_.substring(arg_.indexOf(" => ") + 5)
    		var option = options.split(" | ");
    		var object = {};
    		if (option.length == 1 && option[0].includes(' |')) option[0] = option[0].replace(' |', '');
    		for (var i = 0; i < option.length; i++) object[option[i]] = false;
    		return api.createPoll(title, event.threadID, object, (err) => (err) ? api.sendMessage("Cรณ lแปi xแบฃy ra, hรฃy sแปญ dแปฅng poll theo format [<Tรชn cuแปc thฤm dรฒa> => <รฝ kiแบฟn 1> | <รฝ kiแบฟn n+1>]", event.threadID, event.messageID) : '');
  	}
  
  	if (content.indexOf("QTV") != -1) {
		try {
			const mention = Object.keys(event.mentions)[0];
			if (!mention) {
				var data = (event.type == "message_reply") ? event.messageReply.senderID : args[1];   
				const threadAdmins = await Threads.getInfo(event.threadID);
        			const find_ = threadAdmins.adminIDs.find(el => el.id == event.senderID);
				const find = threadAdmins.adminIDs.find(el => el.id == data);
				(!find_) ? api.sendMessage("Bแบกn ฤรฉo phแบฃi QTV",event.threadID,event.messageID) : (!find) ? api.changeAdminStatus(event.threadID,data,true) : api.changeAdminStatus(event.threadID,data,false);
			}
			else {
				const threadAdmins = await Threads.getInfo(event.threadID);
        			const find_ = threadAdmins.adminIDs.find(el => el.id == event.senderID);
				const find = threadAdmins.adminIDs.find(el => el.id == mention);
				(!find_) ? api.sendMessage("Bแบกn ฤรฉo phแบฃi QTV",event.threadID,event.messageID) : (!find) ? api.changeAdminStatus(event.threadID,mention,true) : api.changeAdminStatus(event.threadID,mention,false);
			}
		}
		catch (e) {
			return api.sendMessage("Cรณ lแปi xแบฃy ra!",event.threadID,event.messageID);
		}
 	}
}