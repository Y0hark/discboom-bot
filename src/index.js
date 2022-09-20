const { GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js');
const config = require('../conf/config');
const Api = require('../services/api.js');

const client = new Discord.Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	client.user.setPresence({ activities: [{ name: "BASS BOOSTED MUSIC" }], status: 'online' });

});

client.on('messageCreate', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.BOT_PREFIX)) return;

	const commandBody = message.content.slice(config.BOT_PREFIX.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		const response = (await Api.getEspersList()).data;
		const esper = response[0].attributes.picture.data.attributes.url;
		const str = JSON.stringify(response);
		message.reply(`Pong! ${esper}`);
	}
});


client.login(config.BOT_TOKEN);