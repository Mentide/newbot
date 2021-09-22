
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');
let User = require("./user.js");
client.commands = new Discord.Collection();
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('бд', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	autoIndex: false,
})
	.catch((e) => console.log('[index.js] ' + e));
fs.readdir('./handler/', (err, files) => {
	let ch = 0;
	if (err) { console.log(err);}
	const jsfile = files.filter(f => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		console.log('❌[app.js] Команды не найдены❌ ');
		return;
	}
	jsfile.forEach((f) => {
		const props = require(`./handler/${f}`);
		ch++;
		client.commands.set(props.help.name, props);
	});
	console.log(`Загружено команд: ${ch}`)
});

client.on("ready", async () => {
});
client.setInterval(async () => {
    const users = await User.find({ muted: true, guild: { $ne: null } });
    users.forEach(async g => {
        let guild = client.guilds.cache.get(g.guild)
        if (!guild) return;
        let name = guild.name;
        const guilds = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id });
        let role = guild.roles.cache.find(r => r.id == guilds.mt);
        if (!role) return;
        let now = new Date()
        now.getTime()
        let time = g.unmute.getTime()
        if (time <= now) {
            let user = await User.findOne({ userID: g.userID, guild: g.guild})
            user.muted = false;
            await user.save()
            let member = guild.members.cache.get(g.userID);
            if (!member) return;
            if (!member.guild.me.hasPermission("MANAGE_ROLES")) return;
            member.roles.remove(role.id).catch(() => { });
            let channel = guild.channels.cache.find(x => x.id == g.channel);
            let embs = new MessageEmbed()
            .setDescription(`Вы были размьючены на сервере **${name}** !`)
            .setColor(guilds.emb)
            if (member) member.send(embs).catch(() => { });
            let emb = new MessageEmbed()
            .setDescription(`**${member.user.tag}** был размучен!`)
            .setColor(guilds.emb)
            if (!channel) return;
            channel.send(emb).catch(() => { });
        }
    })
}, 60000);
client.on('message', async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
	if (!message.member) return;
	let prefix = '.';

		message.content = message.content.substr(prefix.length);
		const newStr = message.content.replace(/\s+/g, ' ');
		const messageArray = newStr.split(' ');
		const cmd = messageArray[0].toLowerCase();
		const args = messageArray.slice(1);
		const commandfile = client.commands.get(cmd);
		if (!commandfile) return;
			commandfile.run(client, message, args);
});

client.login('токен');
