const logger = require("../../utils/log.js");

module.exports = function ({ models }) {
	const Currencies = models.use('Currencies');

	async function getAll(...data) {
		var where, attributes;
		for (let i of data) {
			if (typeof i != 'object') throw 'Phải là 1 Array hoặc Object hoặc cả 2.';
			if (Array.isArray(i)) attributes = i;
			else where = i;
		}
		try {
			return (await Currencies.findAll({ where, attributes })).map(e => e.get({ plain: true }));
		}
		catch (err) {
			logger(err, "error");
			return [];
		}
	}

	async function getData(userID) {
		const data = await Currencies.findOne({ where: { userID }});
		if (data) return data.get({ plain: true });
		else return false;
	}

	async function setData(userID, options = {}) {
		if (typeof options != 'object' && !Array.isArray(options)) throw 'Phải là 1 Object.';
		try {
			(await Currencies.findOne({ where: { userID } })).update(options);
			return true;
		}
		catch (err) {
			logger(err, "error");
			return false;
		}
	}

	async function delData(userID) {
		return (await Currencies.findOne({ where: { userID } })).destroy();
	}

	async function createData(userID, defaults = {}) {
		if (typeof defaults != 'object' && !Array.isArray(defaults)) throw 'Phải là 1 Object.';
		try {
			await Currencies.findOrCreate({ where: { userID }, defaults });
			return true;
		}
		catch (err) {
			logger(err, "error");
			return false;
		}
	}

	async function increaseMoney(userID, money) {
		if (typeof money != 'number') throw 'Phải là 1 số.';
		try {
			let balance = (await getData(userID)).money;
			await setData(userID, { money: balance + money });
			return true;
		}
		catch (err) {
			logger(err, "error");
			return false;
		}
	}

	async function decreaseMoney(userID, money) {
		if (typeof money != 'number') throw 'Phải là 1 số.';
		try {
			let balance = (await getData(userID)).money;
			await setData(userID, { money: balance - money });
			return true;
		}
		catch (err) {
			logger(err, "error");
			return false;
		}
	}
  
 async function setMoney(userID, money) {
    if (typeof money != 'number') throw 'Phải là 1 số.';
    try {
      await setData(userID, { money: money });
      return true;
    }
    catch (err) {
      logger(err, "error");
      return false;
    }
  } 
  
  	async function increaseEXP(userID, exp) {
		if (typeof exp != 'number') throw 'Phải là 1 số.';
		try {
			let exp_ = (await getData(userID)).exp;
			await setData(userID, { exp: exp_ + exp });
			return true;
		}
		catch (err) {
			logger(err, "error");
			return false;
		}
	}

	async function decreaseEXP(userID, exp) {
		if (typeof exp != 'number') throw 'Phải là 1 số.';
		try {
			let exp_ = (await getData(userID)).exp;
			await setData(userID, { exp: exp_ - exp });
			return true;
		}
		catch (err) {
			logger(err, "error");
			return false;
		}
	}
  
 async function setEXP(userID, exp) {
    if (typeof exp != 'number') throw 'Phải là 1 số.';
    try {
      await setData(userID, { exp: exp });
      return true;
    }
    catch (err) {
      logger(err, "error");
      return false;
    }
  }
  
  var emoji = ["tài","xỉu"]
  var random_emoji = emoji[Math.floor(Math.random() * emoji.length)];
       function isOdd(number) {
          return number % 2 === 0;
        }
        function boba(number) {
          if (number[0] === number[1] && number[1] === number[2]) {
            return true;
          } else {
            return false;
          }
        }
  
        function taixiu(number) {
          let result = number.reduce((sum, val) => sum + val, 0);
          if (result > 4 && result < 11) {
            return "xỉu";
          }
          //else if (result > 11 && result < 17) {
          else {
            return "tài";
          }
        /*  else {
            return "tạch";
            }*/
          }
  
        function chanle(number) {
          let result = number.reduce((sum, val) => sum + val, 0);
          if (isOdd(result)) {
            return "chẵn";
          } 
          //else if (!isOdd(result)) {
          else {
            return "lẻ";
          }
          /* else {
            return "tạch";
          }*/
        }
  
	return {
		getAll,
		getData,
		setData,
		delData,
		createData,
		increaseMoney,
		decreaseMoney,
    setMoney,
		increaseEXP,
		decreaseEXP,
    setEXP,    
    isOdd,
    boba,
    taixiu,
    chanle
	}
}