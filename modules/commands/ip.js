module.exports.config = {
	name: "ip",
	version: "1.0.7",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "LαΊ₯y thΓ΄ng tin vα» IP",
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
			`====== STATUS: ${data.status}β ======\n` +
			`π­ Message: ${data.message}`,
			event.threadID, event.messageID
		);
		else return api.sendMessage({body:		
			`====== STATUS: ${data.status}β ======\n` +
			//`π Hostname: ${data.hostname}\n` +
			`π  Continent: ${data.continent}\n` +
			`π© Country: ${data.country}\n` +
			`π³ Region: ${data.region}\n` +
			`π City: ${data.city}\n` +
			`β­ Capital: ${data.capital}\n\n` +
			`π³οΈ Language: ${data.language}\n` +
			`π€ Zip: ${data.zip}\n` +
			`π° Currency: ${data.currency}\n` +
			`β Timezone: ${data.timezone}\n` +
			`β IP Type: ${data.ipType}\n` +
			`π€ Calling Code: ${data.callingCode}\n`
//,location: {latitude: data.latitude, longitude: data.longitude,current: true}
                                }, event.threadID, event.messageID);
//	}
}