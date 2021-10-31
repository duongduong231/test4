module.exports.config = {
	name: "weather",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Xem thông tin thời tiết tại khu vực",
	commandCategory: "other",
	usages: "weather [Location]",
	cooldowns: 5,
	dependencies: ["moment-timezone","request"],
	info: [
		{
			key: "Location",
			prompt: "Địa điểm, thành phố, khu vực",
			type: 'Văn bản',
			example: 'Hà Nội'
		}
	],
	envConfig: {
		"OPEN_WEATHER": "11b382932054f5e17322acedc6ba7c70"
	}
};

module.exports.run = async ({ api, event, args, __GLOBAL, utils }) => {
	const request = require("request");
	const moment = require("moment-timezone");
  const axios = require("axios");
  
	var city = args.join(" ");
	if (city.length == 0) return utils.throwError("weather", event.threadID, event.messageID);
  const weatherData = (await axios.get(encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=11b382932054f5e17322acedc6ba7c70&units=metric&lang=vi`))).data
	//return request(encodeURI("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + __GLOBAL.weather.OPEN_WEATHER + "&units=metric&lang=vi"), (err, response, body) => {
	//	if (err) throw err;
		//var weatherData = JSON.parse(body);
		if (weatherData.cod == 404) return api.sendMessage(`Địa điểm ${city} không tồn tại!`, event.threadID, event.messageID);
		var sunrise_date = moment.unix(weatherData.sys.sunrise).tz("Asia/Ho_Chi_Minh");
		var sunset_date = moment.unix(weatherData.sys.sunset).tz("Asia/Ho_Chi_Minh");
		api.sendMessage({
			body: '🌡 Nhiệt độ: ' + weatherData.main.temp + '°C' + '\n' +
						'🌡 Nhiệt độ cơ thể cảm nhận được: ' + weatherData.main.feels_like + '°C' + '\n' +
						'☁️ Cảnh quan hiện tại: ' + weatherData.weather[0].description + '\n' +
						'💦 Độ ẩm: ' + weatherData.main.humidity + '%' + '\n' +
						'💨 Tốc độ gió: ' + weatherData.wind.speed + 'km/h' + '\n' +
						'🌅 Mặt trời mọc vào lúc: ' + sunrise_date.format('HH:mm:ss') + '\n' +
						'🌄 Mặt trời lặn vào lúc: ' + sunset_date.format('HH:mm:ss') + '\n',
			location: {
				latitude: weatherData.coord.lat,
				longitude: weatherData.coord.lon,
				current: true
			},
		}, event.threadID, event.messageID);
	//});
}