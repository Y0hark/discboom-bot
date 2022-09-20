const axios = require('axios');

const BASE_URL = 'http://yohark.de:1340/api';

class Http {
	constructor () {}

	static get(endpoint, params) {
		return axios.get(BASE_URL + endpoint, {params : {params, populate: "*"}});
	}
}

class Api {

	// dislyte api methods

	// single esper info by name
	static async getEsperInfo(esperName) {
		return (await Http.get('/espers/' + esperName)).data;
	}
	
	// single esper info by god name
	static async getEsperInfoGod(esperGodName) {
		return (await Http.get('/espers/gods/' + esperGodName)).data;
	}

	// all espers list
	static async getEspersList() {
		return (await Http.get('/espers')).data;
	}

	// get relic config
	getRelicsConfig() {
		return Http.get('/relic').data;
	}

}

module.exports = Api;