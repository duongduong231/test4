module.exports.config = {
  name: "abc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "banledangyeuu",
  description: "",
  commandCategory: "media",
  usages: "",
  cooldowns: 1,
  dependencies: ["axios","react-native-voice-changer"]
};

module.exports.run = async({api, event, args}) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  const voiceChanger = require('react-native-voice-changer');
  if(event.type == "message_reply" && event.messageReply.attachments[0].type == "audio" ) {
  let shortaudio = (await axios.get(`${event.messageReply.attachments[0].url}`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(__dirname + `/cache/voicechanger.m4a`, Buffer.from(shortaudio, "utf-8"));
  const effects = [
            {
                id: 1,
                name: "helium",
                pitch: 10,
                rate: 0,
                reverb: []
            },
            {
                id: "3",
                name: "Robot",
                pitch: 3,
                rate: 5,
                amplify: 10,
                echo: [100, 100, 40]
            },
            {
                id: "4",
                name: "Cave",
                pitch: 0,
                rate: 0,
                reverb: [-3.25, 2000, 0.8]
            },
  ]    
  voiceChanger.setPath(fs.createReadStream(__dirname + `/cache/voicechanger.m4a`));
  voiceChanger.createDBMedia();
  voiceChanger.playEffect(effects[0])	
  let changer = await voiceChanger.saveEffect(effects[0])
  console.log('Saved to: ', changer);
  //api.sendMessage({attachment: fs.createReadStream(__dirname + changer)})
  }
}