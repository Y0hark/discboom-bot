const Api = require('./api');
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EsperStatsCalculation } = require('../src/game-logic/esper_stats_calculation');

class BotFunctions {
	
	constructor() {}

	// get esper list

	static async espersList(message) {
		const response = (await Api.getEspersList()).data;
		let espers_list = [];
		response.forEach((esper) => {
			espers_list.push({"name": esper.attributes.name, "god": esper.attributes.deity_name});
		});

		const embed = new EmbedBuilder()
			.setColor('#437799')
			.setTitle('Espers List')
			.setDescription('Here ya go, buddy! Let me list you all the espers in the game! 😍📃')
			.addFields(
				{ name: 'Total Espers', value: (espers_list.length).toString(), inline: false },
				{ name: 'Espers - God', value: espers_list.map((esper) => `${esper.name} - ${esper.god}`).join('\n'), inline: false },
			)

		message.reply({embeds: [embed]});
	}

	// esper by name

	static async esperByName(message, args) {
		const esperName = (args.join(' ')).toLowerCase().replace(' ', '-');
		try {
			
			const response = (await Api.getEsperInfo(esperName)).data;	
			const esper = response.attributes;
			
			const embed = new EmbedBuilder()
				.setColor('#437799')
				.setDescription(`Hell yeah! 🤘 Here's what you've asked for dear! 🎶🎵`)
				.setTitle(`${esper.name} - ${esper.deity_name}`)
				.setImage(esper.picture.data.attributes.url)
				.addFields(
					{ name: 'Element', value: esper.element, inline: true },
					{ name: 'Role', value: esper.role, inline: true },
					{ name: 'Rarity', value: esper.rarity, inline: true },
					{ name: 'HP', value: (esper.hp).toString(), inline: true },
					{ name: 'ATK', value: (esper.atk).toString(), inline: true },
					{ name: 'DEF', value: (esper.def).toString(), inline: true },
					{ name: 'SPD', value: (esper.spd).toString(), inline: true },
					{ name: 'C.RATE', value: (esper.c_rate).toString() + '%', inline: true },
					{ name: 'C.DMG', value: (esper.c_dmg).toString() + '%', inline: true },
					{ name: 'ACC', value: (esper.acc).toString() + '%', inline: true },
					{ name: 'RESIST', value: (esper.resist).toString() + '%', inline: true },
					{ name: 'LEVEL', value: '60', inline: true },
				)
			
			message.reply({embeds: [embed]});
		} catch (error) {
			message.reply(`BA-BA-BAM! Sorry, I couldn't find any esper with that name. 😿 Please consider checking for a possible typo!`);
			console.log('There was an error with this request: ', error);
		}
	}

	// esper by god name

	static async esperByGod(message, args) {
		const godName = (args.join(' ')).toLowerCase().replace(' ', '-');
		try {
			const response = (await Api.getEsperInfoGod(godName)).data;	
			const esper = response.attributes;
			const embed = new EmbedBuilder()
				.setColor('#437799')
				.setDescription(`Hell yeah! 🤘 Here's what you've asked for dear! 🎶🎵`)
				.setTitle(`${esper.name} - ${esper.deity_name}`)
				.setImage(esper.picture.data.attributes.url)
				.addFields(
					{ name: 'Element', value: esper.element, inline: true },
					{ name: 'Role', value: esper.role, inline: true },
					{ name: 'Rarity', value: esper.rarity, inline: true },
					{ name: 'HP', value: (esper.hp).toString(), inline: true },
					{ name: 'ATK', value: (esper.atk).toString(), inline: true },
					{ name: 'DEF', value: (esper.def).toString(), inline: true },
					{ name: 'SPD', value: (esper.spd).toString(), inline: true },
					{ name: 'C.RATE', value: (esper.c_rate).toString() + '%', inline: true },
					{ name: 'C.DMG', value: (esper.c_dmg).toString() + '%', inline: true },
					{ name: 'ACC', value: (esper.acc).toString() + '%', inline: true },
					{ name: 'RESIST', value: (esper.resist).toString() + '%', inline: true },
					{ name: 'LEVEL', value: '60', inline: true },
				)
			
			message.reply({embeds: [embed]});
		} catch (error) {
			message.reply(`BA-BA-BAM! Sorry, I couldn't find any esper with that name. 😿 Please consider checking for a possible typo!`);
			console.log('There was an error with this request: ', error);
		}
	}

	// esper skills by name

	static async esperSkillsByName(message, args) {
		const esperName = (args.join(' ')).toLowerCase().replace(' ', '-');
		try {
			const response = (await Api.getEsperInfo(esperName)).data;	
			const esper = response.attributes;
			const embed = new EmbedBuilder()
				.setColor('#437799')
				.setDescription(`Hell yeah! 🤘 Here's what you've asked for dear! 🎶🎵`)
				.setTitle(`${esper.name} - ${esper.deity_name}`)
				.setImage(esper.picture.data.attributes.url)
				.addFields(
					esper.espers_elements.map((element) => { 
						if (element.__component === 'espers-elements.skill') {
							return { name: `${element.skill_number}`, value: `**${element.name}** - *Type: ${element.type} - Cooldown: ${element.cooldown}* \n ${element.description} `, inline: false } 
						} else if (element.__component === 'espers-elements.captain-ability') {
							return { name: `Captain Ability`, value: `${element.effect} `, inline: false } 
						}		
					}),
				)
			
			message.reply({embeds: [embed]});
		} catch (error) {
			message.reply(`BA-BA-BAM! Sorry, I couldn't find any esper with that name. 😿 Please consider checking for a possible typo!`);
			console.log('There was an error with this request: ', error);
		}
	}
	
	// esper skills by god name

	static async esperSkillsByGod(message, args) {
		const godName = (args.join(' ')).toLowerCase().replace(' ', '-');
		try {
			const response = (await Api.getEsperInfoGod(godName)).data;	
			const esper = response.attributes;
			const embed = new EmbedBuilder()
				.setColor('#437799')
				.setDescription(`Hell yeah! 🤘 Here's what you've asked for dear! 🎶🎵`)
				.setTitle(`${esper.name} - ${esper.deity_name}`)
				.setImage(esper.picture.data.attributes.url)
				.addFields(
					esper.espers_elements.map((element) => { 
						if (element.__component === 'espers-elements.skill') {
							return { name: `${element.skill_number}`, value: `**${element.name}** - *Type: ${element.type} - Cooldown: ${element.cooldown}* \n ${element.description} `, inline: false } 
						} else if (element.__component === 'espers-elements.captain-ability') {
							return { name: `Captain Ability`, value: `${element.effect} `, inline: false } 
						}		
					}),
				)
			
			message.reply({embeds: [embed]});
		} catch (error) {
			message.reply(`BA-BA-BAM! Sorry, I couldn't find any esper with that name. 😿 Please consider checking for a possible typo!`);
			console.log('There was an error with this request: ', error);
		}
	}

	static async buildByName(message, args) {
		const esperName = (args.join(' ')).toLowerCase().replace(' ', '-');
		try {
			const response = (await Api.getEsperInfo(esperName)).data;
			let esper = response.attributes;

			esper = EsperStatsCalculation.buildEspers(esper, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);

			const embed = new EmbedBuilder()
				.setColor('#437799')
				.setDescription(`Hell yeah! 🤘 Here's what you've asked for dear! 🎶🎵`)
				.setTitle(`${esper.name} - ${esper.deity_name}`)
				.setImage(esper.picture.data.attributes.url)
				.addFields(
					esper.espers_elements.map((element) => { 
						if (element.__component === 'espers-elements.build') {
							return { name: `${element.build_number}`, value: `**${element.name}** - *Type: ${element.type} - Cooldown: ${element.cooldown}* \n ${element.description} `, inline: false } 
						}		
					}),
				)
			
			message.reply({embeds: [embed]});
		} catch (error) {
			message.reply(`BA-BA-BAM! Sorry, I couldn't find any esper with that name. 😿 Please consider checking for a possible typo!`);
			console.log('There was an error with this request: ', error);
		}
	}

}

module.exports = BotFunctions;