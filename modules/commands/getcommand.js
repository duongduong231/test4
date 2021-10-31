module.exports.config = {
	name: 'getcommand',
	version: '1.0.0',
	hasPermssion: 2,
	credits: 'NTKhang',
	description: '',
	commandCategory: 'admin',
	usages: '',
	cooldowns: 5
};

module.exports.run = async({args,api,event}) => {
	const fs = require("fs-extra");
	var path = [],
		pathrn = [],
		pathrntxt = [];
	var msg = '';
	var notfound = "";
	for (let file of args) {
		if (!fs.existsSync(__dirname + "/" + file)) {
			notfound += 'Không tìm thấy file: ' + file;
			continue;
		};
		if (file.endsWith('.js')) {
			fs.copyFile(__dirname + '/' + file, __dirname + '/' + file.replace(".js", ".txt"));
			pathrn.push(
				fs.createReadStream(__dirname + '/' + file.replace('.js', '.txt'))
			);
			pathrntxt.push(file.replace('.js', '.txt'));
		} else {
			path.push(fs.createReadStream(__dirname + '/' + file));
		}
	}
	var mainpath = [...path, ...pathrn];
	if (pathrn.length != 0)
		msg +=
		'đã đổi các file có đuôi .js thành đuôi .txt';
	api.sendMessage({
		body: msg + "\n" + notfound,
		attachment: mainpath
	}, event.threadID);
	pathrntxt.forEach(file => {
		fs.unlinkSync(__dirname + '/' + file);
	});
    
};