const { GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js');
const config = require('../conf/config');
const MessageController = require('../services/message_controller');


const client = new Discord.Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	client.user.setPresence({ activities: [{ name: "BASS BOOSTED MUSIC" }], status: 'online' });

});

client.on('messageCreate', async message => {
	MessageController.commandController(message);
});


client.login(config.BOT_TOKEN);