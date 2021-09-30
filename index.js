
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');
let User = require("./user.js");
client.commands = new Discord.Collection();
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('ссылка', {
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
	console.log("[]")

});
client.setInterval(async () => {
    const users = await User.find({ muted: true, guild: { $ne: null } });
    users.forEach(async g => {
        let guild = client.guilds.cache.get(g.guild)
        if (!guild) return;
        let name = guild.name;
        let role = guild.roles.cache.find(r => r.id == "Muted");
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
            let embs = new MessageEmbed()
            .setDescription(`Вы были размьючены на сервере **${name}** !`)
            .setColor(guilds.emb)
            if (member) member.send(embs).catch(() => { });
           
        }
    })
}, 60000);
client.on('message', async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
	if (!message.member) return;
	let prefix = '!';

		message.content = message.content.substr(prefix.length);
		const newStr = message.content.replace(/\s+/g, ' ');
		const messageArray = newStr.split(' ');
		const cmd = messageArray[0].toLowerCase();
		const args = messageArray.slice(1);
		const commandfile = client.commands.get(cmd);
		if (!commandfile) return;
	
	
		
			commandfile.run(client, message, args);
	

	
});
client.login('ODE3NDU1MjExODAzMDUwMDQ0.YEJwfg.C6fx4dPxnRxrkmOP6LWnTM4quuk');
