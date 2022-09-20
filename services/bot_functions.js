const Api = require('./api');
const { EmbedBuilder } = require('discord.js');

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
				{ name: 'Espers - God', value: espers_list.map((esper) => `${esper.name} - ${esper.god}`).join('\n'), inline: true },
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
			console.log(error);
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
			console.log(error);
		}
	}

	// esper skills

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
					{ name: esper.esper_elements[0].skill_number, value: `${esper.esper_elements[0].name} - type: ${esper.esper_elements[0].type} - cooldown: ${esper.esper_elements[0].cooldown} \n ${esper.esper_elements[0].description}`, inline: true },
					{ name: esper.esper_elements[1].skill_number, value: `${esper.esper_elements[1].name} - type: ${esper.esper_elements[1].type} - cooldown: ${esper.esper_elements[1].cooldown} \n ${esper.esper_elements[1].description}`, inline: true },
					{ name: esper.esper_elements[2].skill_number, value: `${esper.esper_elements[2].name} - type: ${esper.esper_elements[2].type} - cooldown: ${esper.esper_elements[2].cooldown} \n ${esper.esper_elements[2].description}`, inline: true },
					{ name: esper.esper_elements[3].skill_number, value: `${esper.esper_elements[3].name} - type: ${esper.esper_elements[3].type} - cooldown: ${esper.esper_elements[3].cooldown} \n ${esper.esper_elements[3].description}`, inline: true }
				)
			
			message.reply({embeds: [embed]});
		} catch (error) {
			console.log(error);
		}
	}

}

module.exports = BotFunctions;