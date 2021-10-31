const logger = require("../../utils/log.js");

module.exports = function ({ models, api }) {
	const Users = models.use('Users');

	async function getInfo(id) {
		return (await api.getUserInfo(id))[id];
	}
  
  	async function getNameUser(id) {
		const axios = require("axios");
		const cheerio = require("cheerio");
		const urlFacebook = `https://www.facebook.com/profile.php?id=${id}`;

		try {
			const { data } = await axios.get(urlFacebook);
			const $ = cheerio.load(data);
			const name = $("title").text() || "Người dùng facebook";
			return name;
		}
		catch (e) {
			logger(e, "error");
			return "Người dùng facebook";
		}
	}

	async function getAll(...data) {
		var where, attributes;
		for (let i of data) {
			if (typeof i != 'object') throw 'Phải là 1 Array hoặc Object hoặc cả 2.';
			if (Array.isArray(i)) attributes = i;
			else where = i;
		}
		try {
			return (await Users.findAll({ where, attributes })).map(e => e.get({ plain: true }));
		}
		catch (err) {
			logger(err, "error");
			return [];
		}
	}

	async function getData(userID) {
		const data = await Users.findOne({ where: { userID } });
		if (data) return data.get({ plain: true });
		else return false;
	}

	async function setData(userID, options = {}) {
		if (typeof options != 'object' && !Array.isArray(options)) throw 'Phải là 1 Object.';
		try {
			(await Users.findOne({ where: { userID } })).update(options);
			return true;
		}
		catch (e) {
			logger(e, "error");
			return false;
		}
	}

	async function delData(userID) {
		return (await Users.findOne({ where: { userID } })).destroy();
	}

	async function createData(userID, defaults = {}) {
		if (typeof defaults != 'object' && !Array.isArray(defaults)) throw 'Phải là 1 Object.';
		try {
			await Users.findOrCreate({ where: { userID }, defaults });
			return true;
		}
		catch (e) {
			logger(e, "error");
			return false;
		}
	}
  ////////////////////////////////////////////////////////////////////
  
  var __importDefault = (this && this.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  const axios_1 = __importDefault(require("axios"));
  const cheerio_1 = require("cheerio");
  async function linkToUid(url) {
      if (url.includes('facebook.com') || url.includes('fb.com')) {
          let { data } = await axios_1.default.get(url);
          let $ = cheerio_1.load(data);
          return {
              error: false,
              data: ($('meta[property="al:android:url"]').attr('content') || $('meta[property="al:ios:url"]').attr('content')).replace('fb://profile/', '')
          };
      }
      else
          return {
              error: true,
              data: 'Không phải là một URL của Facebook.'
          };
  }
  ///////////////////////////////////////////////////////////////////////
	return {
		getInfo,
    getNameUser,
		getAll,
		getData,
		setData,
		delData,
		createData,
    linkToUid
	}
}