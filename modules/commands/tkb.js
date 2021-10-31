module.exports.config = {
  name: "tkb",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	commandCategory: "other",
	usages: "biết dùng thì dùng",
	cooldowns: 1,
	dependencies: ['axios']
};

module.exports.run = async ({ api, event, args }) => {
    const axios = require("axios");
    if (args[0] == "pleiku" || args[0] == "Pleiku" || args[0] == "PLK") {
    let res = await	axios.get(encodeURI(`https://le31.glitch.me/tkb-plk`))
    if (args[1] == "all") return api.sendMessage(`${(res.data.tkb.join(""))}`, event.threadID);
    else return api.sendMessage(`${(res.data.tkb[0])}`, event.threadID);
}
        if (args[0] == "lê lợi" || args[0] == "Lê Lợi" || args[0] == "LL") {
    let res = await	axios.get(encodeURI(`https://le31.glitch.me/tkb-ll`))
    if (args[1] == "all") return api.sendMessage(`${(res.data.tkb.join(""))}`, event.threadID);
    else return api.sendMessage(`${(res.data.tkb[0])}`, event.threadID);
}
        if (args[0] == "hùng vương" || args[0] == "Hùng Vương" || args[0] == "HV") {
    let res = await	axios.get(encodeURI(`https://le31.glitch.me/tkb-hv`))
    if (args[1] == "all") return api.sendMessage(`${(res.data.tkb.join(""))}`, event.threadID);
    else return api.sendMessage(`${(res.data.tkb[0])}`, event.threadID);
}
}
