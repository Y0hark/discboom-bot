import Api from './api.js';

const command = ''

if (command === 'esper') {
	try {
		const esper = Api.getEsperInfo(args[0])
	} catch (error) {
		console.log(error);
		message = `Oh my! Sorry sweetie but I don't know this esper yet! :c Please make sure you didn't make a typo!`;
	}
		
}	

if (command === 'listespers') {
	try {
		const espers = Api.getEspersList()
	} catch (error) {
		console.log(error);
	}
		
}

if (command === 'build') {
	try {
		const fourRelicsSet = Api.getFourRelicsSet(args[0])
		const twoRelicsSet = Api.getTwoRelicsSet(args[0])
			
	} catch (error) {
		console.log(error);
	}
		
	}

if (command === 'listrelics') {
	try {
		const relics = Api.getRelicsList()
	} catch (error) {
		console.log(error);
	}
		
}