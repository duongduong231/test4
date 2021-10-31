module.exports.config = {
  name: "autosetname",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "Tạo tên tự động đặt cho thành viên mới",
  commandCategory: "group",
  usages: "autosetname [option]",
  cooldowns: 1,
	info: [		
    {
			key: 'option => rỗng',
			prompt: 'Bật tắt chức năng',
			type: 'null',
			example: ""
		},
		{
			key: 'option => set',
			prompt: 'Thiết lập tên',
			type: 'string',
			example: 'set [BOXGIRL] {name} 👩'
		},
		{
			key: 'option => del',
			prompt: 'Xóa tên tự động đặt',
			type: 'string',
      example: "del"
		},
		{
			key: 'option => check',
			prompt: 'Kiểm tra tên tự động đặt',
			type: 'string',
      example: "check"
		},
		{
			key: 'option => user',
			prompt: 'Đặt tên cho thành viên được tag/được reply theo tên tự động đặt',
			type: 'string',
			example: "user @abc"
		}
	]
};

module.exports.run = async ({ event, api, args, Threads, client, utils }) => {
  var settings = (await Threads.getData(event.threadID)).settings;
	var threadInfo = await api.getThreadInfo(event.threadID);
  var find = threadInfo.adminIDs.find(el => el.id == event.senderID);
  if (args.length == 0){
    if (!find) return api.sendMessage(`Cần là quản trị viên!`,event.threadID);
    if (settings["autoSetName_"] != true) settings["autoSetName_"] = true;
    else settings["autoSetName_"] = false;
    await Threads.setData(event.threadID, options = { settings });
    client.threadSetting.set(event.threadID, settings);
	  return api.sendMessage(`Đã ${(settings["autoSetName_"] == true) ? "bật" : "tắt"} thành công AUTOSETNAME!`, event.threadID);
  }
  if (args[0] == "set") {
    if (!find) return api.sendMessage(`Cần là quản trị viên!`,event.threadID);
    let msg = args.slice(1).join(" ");
      settings["autoSetName"] = msg;
      await Threads.setData(event.threadID, options = { settings });
      client.threadSetting.set(event.threadID, settings);
      return api.sendMessage(`Đã set thành công tên tự động đặt cho thành viên mới, dưới đây là bản xem thử!`,event.threadID,()=> api.sendMessage(`${msg.replace(/\{name}/g, "[Tên thành viên]").replace(/\{emoji}/g,"[Emoji ngẫu nhiên]")}`,event.threadID))
    } else if (args[0] == "del") {
        if (!find) return api.sendMessage(`Cần là quản trị viên!`,event.threadID);
        settings["autoSetName"] = null;
        await Threads.setData(event.threadID, options = { settings });
        client.threadSetting.set(event.threadID, settings);
        return api.sendMessage(`Đã xóa tên tự động đặt cho thành viên mới!`,event.threadID)
    } else if (args[0] == "check") return api.sendMessage(`${(settings["autoSetName"] == null) ? "Chưa đặt autosetname" : `${ settings["autoSetName"].replace(/\{emoji}/g,"[Emoji ngẫu nhiên]").replace(/\{name}/g, "[Tên thành viên]")} là tên tự động đặt cho thành viên mới!`} `,event.threadID)
    else if (args[0] == "user") {
      var emoji = "😀,😃,😄,😁,😆,😅,😂,🤣,😊,😇,🙂,🙃,😉,😌,😍,🥰,😘,😗,😙,😚,😋,😛,😝,😜,🤪,🤨,🧐,🤓,😎,🤩,🥳,😏,😒,😞,😔,😟,😕,🙁,☹️,😣,😖,😫,😩,🥺,😢,😭,😤,😠,😡,🤬,🤯,😳,🥵,🥶,😱,😨,😰,😥,😓,🤗,🤔,🤭,🤫,🤥,😶,😐,😑,😬,🙄,😯,😦,😧,😮,😲,🥱,😴,🤤,😪,😵,🤐,🥴,🤢,🤮,🤧,😷,🤒,🤕,🤠,🤑,😈,👿,👹,💀,👺,👻,🤡,💩,☠️,👽,👾,🤖,🎃,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🤲,👐,🙌,👏,🤝,👍,👎,👊,✊,🤛,🤜,✌️,🤟,🤘,👌,🤏,👈,👉,👆,👇,☝️,✋,🤚,🖐️,🖖,👋,🤙,💪,🖕,✍️,🙏,🦾,🦿,🦶,🦵,💄,💋,👄,🦷,👅,👂,🦻,👃,👣,👁️,👀,🧠,🗣️,👤,👥,👶,👧,🧒,👦,👩,🧑,👨,👩‍🦱,👨‍🦱,👩‍🦰,👨‍🦰,👱‍♀️,👱‍♂️,👩‍🦳,👨‍🦳,👩‍🦲,👨‍🦲,🧔,👵,🧓,👴,👲,👳‍♀️,👳‍♂️,🧕,👮‍♀️,👮‍♂️,👷‍♀️,👷‍♂️,💂‍♀️,💂‍♂️,🕵️‍♀️,🕵️‍♂️,👩‍⚕️,👨‍⚕️,👩‍🌾,👨‍🌾,👩‍🍳,👨‍🍳,👩‍🎓,👨‍🎓,👩‍🎤,👨‍🎤,👩‍🏫,👨‍🏫,👩‍🏭,👨‍🏭,👩‍💻,👨‍💻,👩‍💼,👨‍💼,👩‍🔧,👨‍🔧,👩‍🔬,👨‍🔬,👩‍🎨,👨‍🎨,👩‍🚒,👨‍🚒,👩‍✈️,👨‍✈️,👩‍🚀,👨‍🚀,👩‍⚖️,👨‍⚖️,👰,🤵,👸,🤴,🦸‍♀️,🦸‍♂️,🦹‍♀️,🦹‍♂️,🤶,🎅,🧙‍♀️,🧙‍♂️,🧝‍♀️,🧝‍♂️,🧛‍♀️,🧟‍♀️,🧛‍♂️,🧟‍♂️,🧞‍♀️,🧞‍♂️,🧜‍♀️,🧜‍♂️,🧚‍♀️,🧚‍♂️,👼,🤰,🤱,🙇‍♀️,🙇‍♂️,💁‍♀️,💁‍♂️,🙅‍♀️,🙅‍♂️,🙆‍♀️,🙆‍♂️,🙋‍♀️,🙋‍♂️,🤦‍♀️,🤦‍♂️,🤷‍♀️,🤷‍♂️,🧏‍♀️,🧏‍♂️,🙎‍♀️,🙎‍♂️,🙍‍♀️,🙍‍♂️,💇‍♀️,💇‍♂️,💆‍♀️,💆‍♂️,🧖‍♀️,🧖‍♂️,💅,🤳,💃,🕺,👯‍♂️,👯‍♂️,🕴️,🚶‍♀️,🚶‍♂️,🧍‍♀️,🧍‍♂️,🧎‍♀️,🧎‍♂️,👩‍🦯,👨‍🦯,👩‍🦼,👨‍🦼,👩‍🦽,🏃‍♀️,🏃‍♂️,👫,👭,👬,💑,👩‍❤️‍👩,👨‍❤️‍👨,💏,👩‍❤️‍💋‍👩,👨‍❤️‍💋‍👨,👨‍👩‍👦,👨‍👩‍👧,👨‍👩‍👧‍👦,👨‍👩‍👦‍👦,👨‍👩‍👧‍👨‍👩‍👧‍👧,👩‍👩‍👦,👩‍👩‍👧,👩‍👩‍👧‍👦,👩‍👩‍👦‍👦,👩‍👩‍👧‍👧,👨‍👨‍👦,👨‍👨‍👧,👨‍👨‍👧‍👦,👨‍👨‍👦‍👦,👨‍👨‍👧‍👧,👩‍👦,👩‍👧,👩‍👧‍👦,👩‍👦‍👦,👩‍👧‍👧,👨‍👦,👨‍👧,👨‍👧‍👦,👨‍👦‍👦,👨‍👧‍👧,🧶,🧵,🧥,🥼,👚,👕,👖,👔,👗,🩱,👙,🩳,🩲,👘,👞,🦺,🥿,👠,👡,👢,🩰,👞,👟,🥾,🧦,🧤,🧣,🎩,🧢,👒,🎓,⛑️,👑,💍,👝,👛,👜,💼,🎒,🧳,👓,🕶️,🌂,🥽,🐶,🐱,🐭,🐹,🐰,🦊,🐻,🐼,🐨,🐯,🦁,🐮,🐷,🐽,🐽,🐸,🐵,🙈,🙉,🙊,🐒,🐔,🐧,🐦,🐤,🐣,🐥,🦆,🦅,🦉,🦇,🐺,🐗,🐴,🦄,🐝,🐛,🦋,🐌,🐞,🐜,🦟,🦗,🕷️,🕸️,🦂,🐢,🐍,🦎,🦖,🦕,🐙,🦑,🦐,🦞,🦀,🦪,🐡,🐠,🐟,🐬,🐳,🐋,🦈,🐊,🐅,🐆,🦓,🦍,🦧,🦥,🐘,🦛,🦏,🐪,🐫,🦒,🦘,🐃,🐂,🐄,🐎,🐖,🐏,🐑,🦙,🐐,🦌,🐕,🦮,🐕‍🦺,🐩,🐈,🐓,🦃,🦚,🦜,🦩,🦢,🕊️,🐇,🦝,🦨,🦡,🦦,🐁,🐀,🐿️,🦔,🐾,🐉,🐲,🌵,🎄,🌲,🌳,🌴,🌱,🌿,☘️,🍀,🎍,🎋,🍃,🍂,🍁,🍄,🐚,🌾,💐,🌷,🌹,🥀,🌺,🌸,🌼,🌻,🌞,🌝,🌛,🌜,🌚,🌕,🌖,🌗,🌘,🌑,🌒,🌓,🌔,🌙,🌎,🌍,🌏,🪐,💫,⭐,🌟,✨,⚡,☄️,💥,🔥,🌪️,🌈,☀️,🌤️,⛅,🌥️,☁️,🌦️,🌧️,⛈️,🌩️,🌨️,❄️,☃️,⛄,🌬️,💨,💧,💦,☔,☂️,🌊,🌫️,🍏,🍎,🍐,🍊,🍋,🍌,🍉,🍇,🍓,🍈,🍒,🍑,🥭,🍍,🥥,🥝,🍅,🍆,🥑,🥦,🥬,🥒,🌶️,🌽,🥕,🥔,🧅,🧄,🍠,🥐,🥯,🍞,🥖,🥨,🧀,🧈,🥚,🍳,🥞,🧇,🥓,🥩,🍗,🍖,🦴,🌭,🍔,🍟,🍕,🥪,🧆,🥙,🌮,🌯,🥗,🥘,🥫,🍝,🍜,🍲,🍛,🍣,🍱,🥟,🍤,🍙,🍚,🍘,🍥,🥠,🥮,🍢,🍡,🍧,🍨,🍦,🥧,🧁,🍰,🎂,🍮,🍭,🍬,🍫,🍿,🍩,🍪,🌰,🥜,🍯,🥛,🍼,☕,🍵,🧉,🥤,🧃,🍶,🍺,🍻,🥂,🍷,🥃,🍸,🍹,🍾,🧊,🥄,🍴,🥡,🥡,🥢,🧂,⚽,🏀,🏈,⚾,🥎,🎾,🏉,🏐,🥏,🎱,🏓,🏸,🏒,🏑,🥍,🏏,🥅,⛳,🏹,🎣,🤿,🥊,🥋,🎽,🛹,🛷,⛸️,🥌,🎿,⛷️,🏂,🏋️‍♀️,🏋️‍♂️,🤼‍♀️,🤼‍♂️,🤸‍♀️,🤸‍♂️,⛹️‍♀️,⛹️‍♂️,🤺,🤾‍♀️,🤾‍♂️,🏌️‍♀️,🏌️‍♂️,🏇,🧘‍♀️,🧘‍♂️,🏄‍♂️,🏊‍♀️,🏊‍♂️,🤽‍♀️,🤽‍♂️,🚣‍♀️,🚣‍♂️,🧗‍♀️,🧗‍♂️,🚵‍♀️,🚵‍♂️,🚴‍♀️,🚴‍♂️,🏆,🥇,🥈,🥉,🏅,🎖️,🏵️,🎗️,🎫,🎟️,🎪,🤹‍♀️,🤹‍♂️,🎭,🎨,🎬,🎤,🎧,🎼,🎹,🥁,🎷,🎺,🎸,🪕,🎻,🎲,♟️,🪀,🎯,🎳,🎮,🎰,🪁,🧩,🚗,🚕,🚙,🚌,🚎,🏎️,🚓,🚑,🚒,🚐,🚚,🚛,🚜,🛴,🦽,🦼,🚲,🛵,🛺,🏍️,🚨,🚔,🚍,🚘,🚖,🚡,🚠,🚟,🚃,🚋,🚞,🚝,🚄,🚅,🚈,🚂,🚆,🚇,🚊,🚉,✈️,🛫,🛬,🛩️,💺,🪂,🛰️,🚀,🛸,🚁,🛶,⛵,🚤,🛥️,🛳️,⛴️,🚢,⚓,⛽,🚧,🚦,🚥,🚏,🗺️,🗿,🗽,🗼,🏰,🏯,🏟️,🎡,🎢,🎠,⛲,⛱️,🏖️,🏝️,🏜️,🌋,⛰️,🏔️,🗻,🏕️,⛺,🏠,🏡,🏘️,🏚️,🏗️,🏢,🏭,🏬,🏣,🏤,🏥,🏦,🏨,🏪,🏫,🏩,💒,🏛️,⛪,🕌,🛕,🕍,🕋,⛩️,🛤️,🛣️,🗾,🎑,🏞️,🌅,🌄,🌠,🎇,🎆,🌇,🌆,🏙️,🌃,🌌,🌉,🌁,⌚,📱,📲,💻,⌨️,🖥️,🖨️,🖱️,🖲️,🕹️,🗜️,💽,💾,💿,📀,📼,📷,📸,📹,🎥,📽️,🎞️,📞,☎️,📟,📠,📺,📻,🎙️,🎚️,🎛️,🧭,⏱️,⏲️,⏰,🕰️,⌛,⏳,📡,🔋,🔌,💡,🔦,🕯️,🪔,🧯,🛢️,💸,💵,💴,💶,💷,💰,💳,💎,⚖️,🦯,🧰,🔧,🔨,⚒️,🛠️,⛏️,🪓,🔩,⚙️,🧱,⛓️,🧲,🔫,💣,🧨,🔪,🗡️,⚔️,🛡️,🚬,⚰️,⚱️,🏺,🔮,📿,🧿,💈,⚗️,🔭,🔬,🕳️,🩹,💊,🩸,💉,🩺,🧬,🦠,🧫,🧪,🌡️,🧹,🧺,🧻,🚽,🚰,🚿,🛁,🛀,🧼,🧽,🪒,🧴,🛎️,🔑,🗝️,🚪,🪑,🛋️,🛏️,🛌,🧸,🖼️,🛍️,🛒,🎁,🎈,🎏,🎀,📩,📨,📧,💌,📥,📤,📦,🎊,✉️,🎉,🧧,🎎,🎐,🏮,🏷️,📪,📫,📬,📭,📮,📯,📜,📃,📄,📑,🧾,📊,📈,📉,🗒️,🗓️,📆,📅,🗑️,📇,🗃️,🗳️,🗄️,📋,📁,🗂️,📂,🗞️,📰,📓,📔,📒,📕,📗,📘,📙,📚,📖,🔖,🧷,🔗,📎,🖇️,📐,📏,🧮,📍,📌,✂️,🖊️,🖋️,✒️,🖌️,🖍️,📝,✏️,🔍,🔎,🔏,🔐,🔒,🔓,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍,💔,❣️,💕,💞,💓,💗,💖,💘,💝,💟,☮️,✝️,☪️,🕉️,☸️,✡️,🔯,🕎,☯️,☦️,🛐,⛎,♈,♉,♊,♋,♌,♍,♎,♏,♐,♑,♒,♓,🆔,⚛️,🉑,☢️,☣️,📴,📳,🈶,🈚,🈸,🈺,🈷️,✴️,🆚,💮,🉐,㊙️,㊗️,🈴,🈵,🈹,🈲,🅰️,🅱️,🆎,🆑,🅾️,🆘,❌,⭕,🛑,⛔,📛,🚫,💯,💢,♨️,🚷,🚳,🚱,🔞,📵,🚭,❗,❕,❓,❔,‼️,⁉️,🔅,🔆,〽️,⚠️,🚸,🔱,⚜️,🔰,♻️,✅,🈯,💹,❇️,✳️,❎,🌐,💠,Ⓜ️,🌀,💤,🏧,🚾,♿,🅿️,🈳,🈂️,🛂,🛃,🛄,🛅,🚹,🚺,🚼,🚻,🚮,🎦,📶,🈁,🔣,ℹ️,🔤,🔡,🔠,🆖,🆗,🆙,🆒,🆕,🆓,0️⃣,1️⃣,2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,🔟,🔢,#️⃣,*️⃣,⏏️,▶️,⏸️,⏺️,⏭️,⏮️,⏩,⏪,⏫,⏬,◀️,🔼,🔽,➡️,⬅️,⬆️,⬇️,↗️,↘️,↙️,↖️,↕️,↪️,↪️,↩️,⤴️,⤵️,🔀,🔁,🔄,🔂,🔃,↔️,🎵,🎶,\➕,➖,✖️,➗,♾️,💲,👁️‍🗨️,💱,®️,™️,©️,🔚,➰,🔙,〰️,🔛,🔜,🔝,➿,✔️,☑️,🔘,⚪,⚫,🔴,🟠,🟡,🟢,🔵,🟣,🟤,🔺,🔻,🔸,🔹,🔶,🔷,🔳,🔲,▪️,▫️,◾,◽,◼️,◻️,⬛,⬜,🟥,🟧,🟨,🟩,🟪,🟦,🟫,🔈,🔇,🔉,🔊,🔔,🔕,📣,📢,💬,💭,🗯️,♠️,♣️,♥️,♦️,🃏,🎴,🀄,🕐,🕑,🕒,🕓,🕔,🕕,🕖,🕘,🕘,🕙,🕚,🕗,🕛,🕜,🕝,🕞,🕟,🕠,🕡,🕦,🕢,🕥,🕤,🕣,🕧".split(",");
      var random = emoji[Math.floor(Math.random() * emoji.length)];                           
      let mentions = Object.keys(event.mentions);
      if (!mentions[0]) {
         if (!args[1]) {
          if (event.type == "message_reply") {
            let name = (await api.getUserInfo(event.messageReply.senderID))[event.messageReply.senderID].firstName
            let msg = settings["autoSetName"].replace(/\{name}/g, name).replace(/\{emoji}/g, random)
            api.changeNickname(msg, event.threadID, event.messageReply.senderID);
          } else {
            let name = (await api.getUserInfo(event.senderID))[event.senderID].firstName
            let msg = settings["autoSetName"].replace(/\{name}/g, name).replace(/\{emoji}/g, random)
            api.changeNickname(msg, event.threadID, event.senderID);
          }
        } 
        else {
          if (isNaN(args[1])) return api.sendMessage(`Sai cú pháp!`,event.threadID);
          let name = (await api.getUserInfo(args[1]))[args[1]].firstName
          let msg = settings["autoSetName"].replace(/\{name}/g, name).replace(/\{emoji}/g, random)
          api.changeNickname(msg, event.threadID, args[1]);
        }
      } else {
        for (let o in mentions) {
          var random = emoji[Math.floor(Math.random() * emoji.length)];                        
          let name = (await api.getUserInfo(mentions[o]))[mentions[o]].firstName
          let msg = settings["autoSetName"].replace(/\{name}/g, name).replace(/\{emoji}/g, random)
          api.changeNickname(msg, event.threadID, mentions[o]);  
        }
      }
    }
    else return api.sendMessage(`Sai cú pháp!`,event.threadID)
}