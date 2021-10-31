module.exports.config = {
	name: "file",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "banledangyeuu",
	description: " ",
	commandCategory: "random-img",
	usages: "",
	cooldowns: 5,
	dependencies: ['fs-extra', 'axios']
};

module.exports.handleReply = ({ api, event, args, handleReply ,client}) => {
	if(event.senderID != handleReply.author) return; 
  const fs = require("fs-extra");
  const path = require("path");
  if (handleReply.id == 0) {
    var arrnum = event.body.split(" ");
    var msg = "";
    var nums = arrnum.map(n => parseInt(n));

    for(let num of nums) {
      var target = handleReply.files[num-1];
      let fileOrdir = fs.statSync(__dirname+'/cache/'+target);
        if(fileOrdir.isDirectory() == true) {
          var typef = "[Folder🗂️]";
          fs.rmdirSync(__dirname+'/cache/'+target, {recursive: true});
        }
        else if(fileOrdir.isFile() == true) {
          var typef = "[File📄]";
          fs.unlinkSync(__dirname+"/cache/"+target);
        }
        msg += typef+' '+handleReply.files[num-1]+"\n";
    }
    api.sendMessage("Đã xóa các file sau trong thư mục cache:\n\n"+msg, event.threadID, event.messageID);
  }
  if (handleReply.id == 1) {
    
  }
}


module.exports.run = async function({ api, event, args, Threads, client }) {
  
  const fs = require("fs-extra");
  /*
  if(args[0] == 'help') {
	var msg = `
  👉Module code by NTKhang👈
Cách dùng lệnh:

•Key: start <text>
•Tác dụng: Lọc ra file cần xóa có ký tự bắt đầu tùy chọn
•Ví dụ: cache rank

•Key: ext <text>
•Tác dụng: Lọc ra file cần xóa có đuôi tùy chọn
•Ví dụ: cache png

•Key: <text>
•Tác dụng: lọc ra các file trong tên có text tùy chỉnh
•Ví dụ: cache a

•Key: để trống
•Tác dụng: lọc ra tất cả các file trong cache
•Ví dụ: cache

•Key: help
•Tác dụng: xem cách dùng lệnh
•Ví dụ: cache help`;
	
	return api.sendMessage(msg, event.threadID, event.messageID);
  }
  */
  if(args[0] == "del" ) {
    var files = fs.readdirSync(__dirname+"/cache") || [];
    var msg = "", i = 1;
    if(args[1] == "start" && args[2]) {
    var word = args.slice(1).join(" ");
  	let files = files.filter(file => file.startsWith(word));
  	
    if(files.length == 0) return api.sendMessage(`Không có file nào trong cache có ký tự bắt đầu bằng: ${word}`, event.threadID ,event. messageID);
    var key = `Có ${files.length} file có ký tự bắt đầu là: ${word}`;
  }
  
  //đuôi file là..... 
  else if(args[1] == "ext" && args[2]) {
  	var ext = args[2];
  	var files = files.filter(file => file.endsWith(ext));
  	
  	if(files.length == 0) return api.sendMessage(`Không có file nào trong cache có ký tự kết thúc bằng: ${ext}`, event.threadID ,event. messageID);
  	var key = `Có ${files.length} file có đuôi là: ${ext}`;
  }
  //all file
  else if (!args[1]) {
  if(files.length == 0) return api.sendMessage("Cache của bạn không có file hoặc folder nào", event.threadID ,event. messageID);
  var key = "Tất cả các file trong thư mục cache:";
  }
  //trong tên có ký tự.....
  else {
  	var word = args.slice(4).join(" ");
  	var files = files.filter(file => file.includes(word));
  	if(files.length == 0) return api.sendMessage(`Không có file nào trong tên có ký tự: ${word}`, event.threadID ,event. messageID);
  	var key = `Có ${files.length} file trong tên có ký tự: ${word}`;
  }
  	files.forEach(file => {
    	var fileOrdir = fs.statSync(__dirname+'/cache/'+file);
    	if(fileOrdir.isDirectory() == true) var typef = "[Folder🗂️]";
    	if(fileOrdir.isFile() == true) var typef = "[File📄]";
    	msg += (i++)+'. '+typef+' '+file+'\n';
    });
    
     api.sendMessage(`Reply tin nhắn bằng số để xóa file tương ứng, có thể rep nhiều số, cách nhau bằng dấu cách.\n${key}\n\n`+msg, event.threadID, (e, info) => client.handleReply.push({
  	name: this.config.name,
    id : 0,
  	messageID: info.messageID,
    author: event.senderID,
  	files
  }))
  }
  else if(args[0] == "getCommand") {
  var files = fs.readdirSync(__dirname) || [];
  if (!args[1]) {
  let filter = files.filter(file => file.endsWith("js"));
    let i = 1, msg= ""
    filter.forEach(file => {
    //	var fileOrdir = fs.statSync(__dirname+'/cache/'+file);
      var fileOrdir = fs.statSync(__dirname+"/"+file);
      //if(fileOrdir.isDirectory() == true) var typef = "[Folder🗂️]";
    	if(fileOrdir.isFile() == true) var typef = "[File📄]";
    	msg += JSON.stringify(file.replace(".js",""));
    });
    var key = "Tất cả các file trong thư mục commands:";
    api.sendMessage(`Reply tin nhắn bằng số để lấy file tương ứng, có thể rep nhiều số, cách nhau bằng dấu cách.\n${key}\n\n`+msg, event.threadID, (e, info) => client.handleReply.push({
  	name: this.config.name,
    id : 1,
  	messageID: info.messageID,
    author: event.senderID,
  	files
  }))
  } else {
      api.sendMessage({attachment:""},event.threadID)
  }
  }
}                                                         