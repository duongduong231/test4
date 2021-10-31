module.exports.config = {
	name: "acr",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "banledangyeuu",
	description: "Tìm kiếm từ viết tắt",
	commandCategory: "other",
	usages: "acr [word]",
	cooldowns: 5,
	dependencies: ['request', 'fs-extra','axios']	,
  info: [
		{
			key: "word",
			prompt: "Từ cần tìm kiếm",
			type: 'Văn bản',
			example: 'wtf'
		}
	]
};

module.exports.run = ({ event, api, args }) => {
    const { createWriteStream, createReadStream, unlinkSync } = require("fs-extra");
    const request = require("request");
    const axios = require("axios");
	  const fs = require("fs-extra");
  
			var content = args[0];
			if (!content) return api.sendMessage(`Bạn chưa thêm từ viết tắt cần tìm kiếm!`, event.threadID, event.messageID);
			var acronym_uri = `http://acronyms.silmaril.ie/cgi-bin/xaa?${content}`;
			var acronym_meanings = [];
			return request(acronym_uri, { json: true }, (err, res, body) => {
				if (err) throw err;
				var split_body = body.split("\n");
				var num_acronyms = split_body[4];
				if (num_acronyms.includes("0")) api.sendMessage("Không tìm thấy từ viết tắt này trong từ điển.", event.threadID, event.messageID);
				else {
					for (var i = 6; i < split_body.length - 1; i += 4) {
						var line = split_body[i];
						line = line.trim();
						var split_acr_array = line.split(" ");
						var first_item = split_acr_array[0];
						if (split_acr_array.length === 1) {
							first_item = first_item.slice(7, first_item.length - 8);
							split_acr_array[0] = first_item;
						}
						else {
							var strpd_item = first_item.slice(7, first_item.length + 5);
							split_acr_array[0] = strpd_item;
							var last_item = split_acr_array[split_acr_array.length - 1];
							var strpd_last_item = last_item.slice(0, split_acr_array.length - 11);
							split_acr_array[split_acr_array.length - 1] = strpd_last_item;
						}
						var final_acronym = split_acr_array.toString();
						final_acronym = final_acronym.split(",").join(" ");
						acronym_meanings.push(final_acronym);
					}
					api.sendMessage(`Nghĩa của từ viết tắt '${content}' là:\n ` + acronym_meanings.join("\n - ") + `.`, event.threadID, event.messageID);
				};
			});
}
                                                                 