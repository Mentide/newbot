const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const moment = require("moment");

const User = require('../user.js');
module.exports.run = async (client, message, args) => {
	if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
	
	if (message.guild.id == '797863873633976320') return;
	let nemb = new MessageEmbed()
	.setAuthor('Ошибка ❌')
	.setDescription(`**${message.author}, у Вас нехватка прав.\nТребуемые права: \`Управлять сообщениями\`**`)
	.setColor("#d30d27")
	if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(nemb);
	if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**<a:net:810429654741680166>Ошибка**\n**У меня нет необходимых прав.\n> Выдайте право  ,,Управлять сообщениями"** ').catch(e => console.log(`команда, ${message.guild.name}:` + e));
	if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('**<a:net:810429654741680166>Ошибка**\n**У меня нет необходимых прав.\n> Выдайте право  ,,Управлять ролями"** ').catch(e => console.log(`команда, ${message.guild.name}:` + e));
	
	const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
	if (!member) return message.reply('**<a:net:810429654741680166>Ошибка**\nУкажи пользователя для мута!').catch(e => console.log(`команда, ${message.guild.name}:` + e));
	testss = new MessageEmbed()
	.setDescription('**<a:net:810429654741680166>Ошибка**\nНе нужно мутить бота!')
	.setColor(guild.emb);
	if(member.user.bot === true) return message.channel.send({embed:testss});//Проверка на бота

	if (member == message.member.id) return message.reply('эй! Не надо мутить себя');
	if(member.permissions.has("MANAGE_MESSAGES")) return  message.reply('**не нужно мутить модератора!**').catch(() => {});
	
	
	const role = message.guild.roles.cache.find(r => r.id == "Muted");
	if (!role) return;
	if(role && member.roles.cache.has(role.id)) return message.channel.send("**❌Ошибка**\nЭтот пользователь уже в муте").catch(() => {});
	let rl = message.guild.me.roles.highest.position;
	if (rl) e = role.position;
	if (rl) a = message.guild.me.roles.highest.position;
	let ess = new MessageEmbed()
	.setAuthor('Ошибка ❌')
	.setColor("#d30d27")
	.setDescription(`${message.author}, поставьте роль бота выше, чем роль мута!`)
	if (e > a && rl) return message.channel.send(ess);
const time = args[1];

if (!args[1]) return message.reply('**ты забыл указать время.\n> Образец мута: .mute @пользователь 1h <причина>**').catch(e => console.log(`команда, ${message.guild.name}:` + e));

	

if (!args[2]) args[2] = 'не указана';
const reason = args.slice(2).join(" ");
if (reason.length > 150) return message.reply('**<a:net:810429654741680166>ошибка\nУстанови длину текста меньше 150 символов**');
	if (ms(time) < 6e4) return message.reply('укажите время больше 1 минуты!');
	let toms =  ms(time);
let result = Math.floor(toms / 1000);
   if (!result) return message.reply('укажите корректное время!\n> Пример: **1m | 30m | 3h**');
	//31536000000
	if (ms(time) > 31536000001) return message.reply('укажите время меньше года!');
	let user = await User.findOne({ userID: member.id,guild:message.guild.id }) || new User({ userID: member.id, displayName: member.displayName,guild:message.guild.id });
	user.channel = message.channel.id;
	user.guildid = message.guild.name;
	user.reason = reason;
	user.time = time;
	user.muteinfo = moment(Date.now()).format('DD.MM.YYYY/HH:mm:ss');
	user.save();
	let timestamp = new Date().getTime();
  let mutedUntil = new Date();

  mutedUntil.setTime(timestamp + ms(time));

  user.unmute = mutedUntil;
  user.muted = true;
  user.save().catch(() => {});
	member.roles.add(role.id).catch(() =>{});

	const emsb = new MessageEmbed()
	
	.setDescription(`**<@${member.id}>** пользователь получил мьют на **${ms(ms(time))}**\n Причина - \`${reason}\` | выдал мут **<@${message.member.id}>**`)
	
	message.channel.send({ embed: emsb }).catch(() => {});
	var embeds = new MessageEmbed()
    .setTitle('Вы были замьючены!')
    .setDescription(`**Причина:** \`${reason}\`\n **Мут выдал:** \`${message.author.tag}\`\n**Длительность мута:** \`${ms(ms(time))}\`\n**Сервер:** ${message.guild.name}`)
         .setTimestamp()
  member.send({embed:embeds}).catch(() =>{})
}



module.exports.help = {
	name: 'mute',
};
