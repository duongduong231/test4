module.exports.config = {
	name: "ip",
	version: "1.0.7",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Lấy thông tin về IP",
	commandCategory: "General",
	usages: "ip [ip]",
	cooldowns: 5,
	dependencies: ["axios"]
};
module.exports.run = async function({ api, event, args }) {
	const axios = require('axios');
	//var regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
	//if (regex.test(args.join(""))){
  let data = (await	axios.get(encodeURI(`https://le31.glitch.me/ip?q=`+ args.join("")))).data;    
  //var data = (await axios.get(`https://le31.glitch.me/ip?q=`+ args.join(""))).data
		if (data.status == "fail") return api.sendMessage(		
			`====== STATUS: ${data.status}❌ ======\n` +
			`💭 Message: ${data.message}`,
			event.threadID, event.messageID
		);
		else return api.sendMessage({body:		
			`====== STATUS: ${data.status}✅ ======\n` +
			//`🙂 Hostname: ${data.hostname}\n` +
			`🌠 Continent: ${data.continent}\n` +
			`🚩 Country: ${data.country}\n` +
			`🕳 Region: ${data.region}\n` +
			`🏙 City: ${data.city}\n` +
			`⭐ Capital: ${data.capital}\n\n` +
			`🏳️ Language: ${data.language}\n` +
			`🤐 Zip: ${data.zip}\n` +
			`💰 Currency: ${data.currency}\n` +
			`⌛ Timezone: ${data.timezone}\n` +
			`❕ IP Type: ${data.ipType}\n` +
			`🤙 Calling Code: ${data.callingCode}\n`
//,location: {latitude: data.latitude, longitude: data.longitude,current: true}
                                }, event.threadID, event.messageID);
//	}
}