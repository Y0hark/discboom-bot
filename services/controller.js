const config = require('../conf/config');
const BotFunctions = require('./bot_functions');

const commandsList = new Map();

config.COMMANDS_LIST.forEach((command) => {
		commandsList.set(command.command, command.function);
});

class Controller {
	constructor() {}
	
	// message controller
	static async commandController(message) {

		if (message.author.bot) return;
		if (!message.content.startsWith(config.BOT_PREFIX)) return;

		const commandBody = message.content.slice(config.BOT_PREFIX.length);
		const args = commandBody.split(' ');
		const command = args.shift().toLowerCase();


		if (commandsList.has(command)) {
			const now = new Date();
			console.log(`Command ${command} found. Executing... | Author ${message.author.username} | Channel ${message.channel.name} | Guild ${message.guild.name} | Time UTC ${now.toISOString()}`);
			BotFunctions[commandsList.get(command)](message, args);
		} else {
			message.reply(`BOOM BOOM CLAP! Sorry dear, "${command}" is not a command I know! 😿`);
		}
	}

}

module.exports = Controller;