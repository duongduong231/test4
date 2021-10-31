module.exports.config = {
  name: "test",
  version: "0.0.1",
  hasPermssion: 2,
  credits: "bla bal",
  description: "",
  commandCategory: "other",
  usages: ""
};

module.exports.run = async ({ event, api, args, client }) => {
  //try {
    if(client.family == true) return api.sendMessage("Hệ thống đang xử lý yêu cầu từ box khác, vui lòng quay lại sau", event.threadID, event.messageID);
    client.family = true;
	  var timestart = Date.now();
	  const fs = require("fs-extra");
	  const axios = require("axios");
	  const { threadID, messageID } = event;
	  const request = require("request");
	  const superfetch= require("node-superfetch");
	  if(!fs.existsSync(__dirname+'/cache/fontfamily.ttf')) {
	    let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1HOnwKqsW_1CamOnFsmrRW1wvefFF5YpF&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/fontfamily.ttf", Buffer.from(getfont, "utf-8"));
	  };
	  
	  if(!args[0] || isNaN(args[0]) == true || args[0] == "help") {
	    if(!fs.existsSync(__dirname+"/cache/hexcolor.png")) {
	     let getimg = (await axios.get(`https://www.htlvietnam.com/images/bai-viet/code-mau/bang-ma-mau-02.jpg`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/hexcolor.png", Buffer.from(getimg, "utf-8"));
	    }
	    client.family = false;
		return api.sendMessage({body: "Nhập size avatar thành viên thích hợp và mã màu cho chữ (mặc định là đen) theo cú pháp:\n$family <size> <mã màu> <title>\nTrong đó:\n•size: Size mỗi avatar thành viên\n•mã màu: mã màu dạng hex\n•title: tiêu đề ảnh, mặc định là tên box nếu ko điền\nVí dụ: $family 200 #ffffff Anh em một nhà\nNếu chọn size = 0 thì sẽ tự chỉnh size, nếu không điền title thì title sẽ là tên box",
		attachment: fs.createReadStream(__dirname+"/cache/hexcolor.png")}, threadID, messageID);
	  };
    
    
    const jimp = require("jimp");
    const chalk = require("chalk");
    const Canvas = require("canvas");
  

    var threadInfo = await api.getThreadInfo(threadID);
    var arrob = threadInfo.adminIDs;
    var arrad = [];
    for(let qtv of arrob) {
      arrad.push(qtv.id)
    };
    const background = await Canvas.loadImage("https://i.ibb.co/xqrFW4N/Pics-Art-06-26-12-07-26.jpg");
    
    var idtv = threadInfo.participantIDs;
  
    var xbground = background.width,
        ybground = background.height;


    var dem = 0;
    var tds = 200,
        s = parseInt(args[0]);//size
        //AUTO SIZE
    var mode = "";
    if(s == 0) {
      var dtich = xbground*(ybground-tds);
      var dtichtv = Math.floor(dtich/idtv.length);
      var s = Math.floor(Math.sqrt(dtichtv));
      mode += " (Auto size)"
    };
        //===============================
    var l =     parseInt(s/15),//lines
        x =     parseInt(l),//
        y =     parseInt(tds),//
        xcrop = parseInt(idtv.length*s),
        ycrop = parseInt(tds+s);
        console.log(s);
    s = s-l*2;
    //===============================
    
    var color = args[1];
    if(!color || !color.includes("#")) {
      color = "#000000";
      
    };
        if(s > ybground || s > xbground) {
          client.family = false;
          return api.sendMessage(`Size avatar phải nhỏ hơn size background\nSize background: X: ${xbground}, Y: ${ybground}`, threadID, messageID);
        }
        api.sendMessage(`🔢Số ảnh dự tính: ${idtv.length}\n🆒Size background: ${xbground} x ${ybground}\n🆕Size mỗi avatar: ${s}${mode}\n#️⃣Màu: ${color}\n⏳Đang xử lý request của bạn, quá trình này có thể mất đến 5p để hoàn tất...`,threadID, messageID);
    var loadkhung = await Canvas.loadImage("https://i.ibb.co/H41cdDM/1624768781720.png");//("https://s1.uphinh.org/2021/06/24/1624551553171.png");
    var title = args.slice(2).join(" ") || threadInfo.name;
    var path_alltv = __dirname+`/cache/alltv${threadID}${Date.now()}.png`;
    function delay(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
    };
    const canvas = Canvas.createCanvas(xbground, ybground);
    let ctx = canvas.getContext('2d');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    var ngdung = 0;// đếm acc die
    //======FOR LOOP DRAW AVATAR=====//
    
    for(let id of idtv) {
        try {
        	var avatar = await superfetch.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
        	if(avatar.url == "https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/UlIqmHJn-SK.gif") {throw Error};
        }
        catch(e) {
          //var avatar = await superfetch.get(`https://le31.glitch.me/avt?q=${id}`);
          //if(avatar.body.length == 390) {
            if(e) ngdung ++;
            continue; 
          //}
        };

        if(x+s > xbground) {
          xcrop = x;
        	x += (-x)+l;
        	y += s+l;
        	ycrop += s+l;
        };
        
        if(ycrop > ybground) {
          ycrop += (-s);
          break;
        }; 
      
        avatar = avatar.body;
        const img = new Canvas.Image();
        var avatarload = await Canvas.loadImage(avatar);
        img.src = avatarload;

        ctx.drawImage(avatarload, x, y, s, s);

        if(arrad.includes(id)) {
        ctx.drawImage(loadkhung, x, y, s, s);
        };
        console.log(chalk.green("Family: ")+"Đã vẽ "+dem+" ảnh");
        dem++;
        img.onerror = err => { throw err };
        x += parseInt(s+l);
    };
   Canvas.registerFont(__dirname+"/cache/fontfamily.ttf", {
        family: "Manrope"
    });
    ctx.font = "100px Manrope";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(title, xcrop/2, 133);
    //ctx.beginPath();
    console.log(chalk.yellow("Convert to buffer..."));
    //const imageBuffer = canvas.toBuffer();

    console.log(chalk.blue(`Sucess X: ${xcrop}, Y: ${ycrop}`));
    try{//ktra auto cắt ảnh có bị lỗi hay ko
      const imagecut = await jimp.read(canvas.toBuffer());
      console.log("Đã đọc image", xcrop, ycrop);
      //=========== CUT IMAGE ===========//
      imagecut.crop(0, 0, xcrop, ycrop+l-30).writeAsync(path_alltv);
      console.log("Đã cắt xong ảnh và lưu vào cache");
      await delay(200);
       api.sendMessage({body: `🟦Số ảnh: ${dem} (Đã lọc ${ngdung} Người dùng facebook)\n🆒Size background: ${xbground} x ${ybground}\n🆕Size mỗi avatar: ${s}${mode}\n⏱️Thời gian xử lý: ${Math.floor((Date.now()-timestart)/1000)} giây`,
          attachment: fs.createReadStream(path_alltv, { 'highWaterMark': 128 * 1024 })
       }, threadID, (e, info) => {
         if(e) {
            api.sendMessage("Đã xảy ra lỗi, vui lòng thử lại sau", threadID, messageID);
         };
         fs.unlinkSync(path_alltv);
       }, messageID);
       client.family = false
    }
    catch(e) {
      console.log(e.stack);
      fs.writeFileSync(path_alltv, canvas.toBuffer());
       api.sendMessage({
        body: `Đã xảy ra lỗi Auto cut\n🟦Số ảnh: ${dem}\n(Đã lọc ${ngdung} Người dùng facebook)\n🆒Size background: ${xbground} x ${ybground}\n🆕Size mỗi avatar: ${s}${mode}\n⏱️Thời gian xử lý: ${Math.floor((Date.now()-timestart)/1000)} giây`,
            attachment: fs.createReadStream(path_alltv, { 'highWaterMark': 128 * 1024 })
         }, threadID, (e, info) => {
           if(e) {
              api.sendMessage("Đã xảy ra lỗi, vui lòng thử lại sau", threadID, messageID);
           };
           fs.unlinkSync(path_alltv);
         }, messageID);
         client.family = false;
    }
  }
  /*catch(e) {
    client.family = false
  };
}/*

/*
/////////////////////////////cache//////////////////////////////////
module.exports.handleReply = ({ api, event, args, handleReply ,client}) => {
	if(event.senderID != handleReply.author) return; 
  const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
    var target = handleReply.files[num-1];
    var fileOrdir = fs.statSync(__dirname+'/cache/'+target);
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


module.exports.run = async function({ api, event, args, Threads, client }) {
  
  const fs = require("fs-extra");
  var files = fs.readdirSync(__dirname+"/cache") || [];
  var msg = "", i = 1;
  
//

  if(args[0] == 'help') {
    	//❎ko edit tên tác giả❎
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
  else if(args[0] == "start" && args[1]) {
  	var word = args.slice(1).join(" ");
  	var files = files.filter(file => file.startsWith(word));
  	
    if(files.length == 0) return api.sendMessage(`Không có file nào trong cache có ký tự bắt đầu bằng: ${word}`, event.threadID ,event. messageID);
    var key = `Có ${files.length} file có ký tự bắt đầu là: ${word}`;
  }
  
  //đuôi file là..... 
  else if(args[0] == "ext" && args[1]) {
  	var ext = args[1];
  	var files = files.filter(file => file.endsWith(ext));
  	
  	if(files.length == 0) return api.sendMessage(`Không có file nào trong cache có ký tự kết thúc bằng: ${ext}`, event.threadID ,event. messageID);
  	var key = `Có ${files.length} file có đuôi là: ${ext}`;
  }
  //all file
  else if (!args[0]) {
  if(files.length == 0) return api.sendMessage("Cache của bạn không có file hoặc folder nào", event.threadID ,event. messageID);
  var key = "Tất cả các file trong thư mục cache:";
  }
  //trong tên có ký tự.....
  else {
  	var word = args.slice(0).join(" ");
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
  	messageID: info.messageID,
    author: event.senderID,
  	files
  }))
 
}
*/

/*
////////////////////////Advice/////////////////////
module.exports.run = async function({ api, event, args, client, __GLOBAL }) {  
  const request = require("request");
  const srod = require("srod-v2");
  const Data = (await srod.GetAdvice()).embed.description;
  
  return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=${Data}`), (err, response, body) => {
		if (err) return api.sendMessage("Đã có lỗi xảy ra!", event.threadID, event.messageID);
		var retrieve = JSON.parse(body);
		var text = '';
		retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
    api.sendMessage(Data+'\n'+text, event.threadID, event.messageID)
  });
}
*/


/*
function wrapText(ctx, text, maxWidth) {
  return new Promise(resolve => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText("W").width > maxWidth) return resolve(null);
    const words = text.split(" ");
    const lines = [];
    let line = "";
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
        line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
}

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas, Canvas } = require("canvas");
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + "/cache/clock.png";

  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");

  var data = (await axios.get("https://le31.glitch.me/poem")).data;
  var cadao = data.data;
  var text = `${gio}\n${cadao}`;

  var imgg = [
    "https://s1.uphinh.org/2021/04/09/PicsArt_04-09-05.44.24.jpg",
    "https://s1.uphinh.org/2021/04/09/PicsArt_04-09-05.44.06.jpg",
    "https://s1.uphinh.org/2021/04/09/4f8d78f0571f3a581f09837b007ac468.jpg",
  "https://s1.uphinh.org/2021/04/10/PicsArt_04-10-10.24.09.jpg"
  ];
  var imgrd = imgg[Math.floor(Math.random() * imgg.length)];

  let getTrum = (await axios.get(`${imgrd}`, { responseType: "arraybuffer" }))
    .data;
  fs.writeFileSync(pathImg, Buffer.from(getTrum, "utf-8"));
  let baseImage = await loadImage(pathImg);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.font = "27px serif";//Courier New
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  let fontSize = 500;
  while (ctx.measureText(text).width > 650) {
    fontSize--;
    ctx.font = `500 ${fontSize}px Courier New`;
  }
  const lines = await wrapText(ctx, text, 580);
  ctx.fillText(lines.join("\n"), 15, 520);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};*/

  
  /* 
  const moment = require("moment-timezone")
  var countDate = new Date('Sep 21 2021 00:00:00').getTime();
  var gap = countDate - (new Date().getTime());
  var second = 1000;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;
  api.sendMessage("Trung Thu:\n*"+(Math.floor(gap / (day)) < 10 ? "0" + Math.floor(gap / (day)) : Math.floor(gap / (day))) + (Math.floor(gap / (day)) <= 1 ? " day\n" : "* days\n") + "*" +
      (Math.floor((gap % (day)) / (hour)) < 10 ? "0" + Math.floor((gap % (day)) / (hour)) : Math.floor((gap % (day)) / (hour))) + (Math.floor((gap % (day)) / (hour)) <= 1 ? "* hour\n" : "* hours\n") + "*" +
      (Math.floor((gap % (hour)) / (minute)) < 10 ? "0" + Math.floor((gap % (hour)) / (minute)) : Math.floor((gap % (hour)) / (minute))) + (Math.floor((gap % (hour)) / (minute)) <= 1 ? "* minute\n" : "* minutes\n")  + "*" +
      (Math.floor((gap % (minute)) / second) < 10 ? "0" + Math.floor((gap % (minute)) / second) : Math.floor((gap % (minute)) / second)) + (Math.floor((gap % (minute)) / second) <= 1 ? "* second" : "* seconds"),event.threadID)
  */

  /*
  const fs = require("fs-extra");
  const request = require("request");  
  let dirMaterial = __dirname + `/cache/rank/`;
  request("https://raw.githubusercontent.com/omgdoge/image/main/diamond.png").pipe(fs.createWriteStream(dirMaterial + "rank_card/diamond.png"));
  //request("https://github.com/omgdoge/image/raw/main/rankcard_mirai_2.png").pipe(fs.createWriteStream(dirMaterial + "rank_card/test2.png"));
  api.sendMessage("Done!",event.threadID);*/
