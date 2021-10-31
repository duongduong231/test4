module.exports.config = {
	name: "domath",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "minigame giải toán",
	commandCategory: "game-sp",
	usages: "domath [rỗng/baby/easy/medium/hard/extreme/impossible]",
	cooldowns: 5,
};
module.exports.handleReply = async ({ api, event, __GLOBAL, handleReply }) => {
      //const indexOfReply = handleReply.findIndex(e => e.messageID == event.messageReply.messageID && e.author == event.senderID);
      const timeout = event.messageReply.timestamp + 15000;
      if (event.timestamp - timeout >= 0) return api.sendMessage(`Bạn đã hết thời gian để trả lời câu hỏi này!`, event.threadID);
      (event.body == handleReply.answer) ? api.sendMessage(`Bing bong, kết quả của bạn hoàn toàn chính xác!\nBạn đã trả lời câu hỏi này trong vòng ${(event.timestamp - event.messageReply.timestamp) / 1000} giây!`, event.threadID) : api.sendMessage(`ahh, có vẻ bạn đã trả lời sai, câu trả lời đúng là: ${handleReply.answer}`, event.threadID);
      return api.unsendMessage(handleReply.messageID)
      //handleReply.splice(indexOfReply, 1);
}

module.exports.run = async ({ api, event, args, __GLOBAL, client }) => {
      const content = args[0];
      let difficulty, answer, value1, value2;
      const difficulties = ["baby","easy","medium","hard","extreme","impossible"];
      difficulties.some(item => content == item) ? (difficulty = content) : (difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]);
      const operations = ["+", "-", "*"];
      const maxValues = {
        baby: 10,
        easy: 50,
        medium: 100,
        hard: 500,
        extreme: 1000,
        impossible: Number.MAX_SAFE_INTEGER
      };
      const maxMultiplyValues = {
        baby: 5,
        easy: 12,
        medium: 30,
        hard: 50,
        extreme: 100,
        impossible: Number.MAX_SAFE_INTEGE
      };
      const operation =operations[Math.floor(Math.random() * operations.length)];
      value1 = Math.floor(Math.random() * maxValues[difficulty] - 1) + 1;
      value2 = Math.floor(Math.random() * maxValues[difficulty] - 1) + 1;
      switch (operation) {
        case "+":
          answer = value1 + value2;
          break;
        case "-":
          answer = value1 - value2;
          break;
        case "*":
          answer = value1 * value2;
          break;
      }
      return api.sendMessage("== Bạn có 15 giây để trả lời ==" +`\n ${value1} ${operation} ${value2} = ?`,event.threadID, async (err, info) => await
          client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            target: parseInt(event.threadID),
            author: event.senderID,
            answer
          }),
        event.messageID
      );
}