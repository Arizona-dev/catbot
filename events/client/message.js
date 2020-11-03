const { Collection } = require('discord.js');
const { PREFIX } = require('../../config');

module.exports = (client, message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const user = message.mentions.users.first();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    // Security Permissions
    if (command.help.permissions && !message.member.hasPermission('ADMINISTRATOR')) { return message.reply('Yo you don\'t have the perms to do that'); }

    // Args
    if (command.help.args && !args.length) {
        let noArgsReply = `This command needs arguments, ${message.author}!`;

        if (command.help.usage) noArgsReply += `\n Here is how to use it: \`${PREFIX}${command.help.name} ${command.help.usage}\``;

        return message.channel.send(noArgsReply);
    }

    // Mention
    if (command.help.isUserAdmin && !user) { return message.reply('You need to mention a user.'); }

    // Permissions isUserAdmin
    if (command.help.isUserAdmin && message.guild.member(user).hasPermission('ADMINISTRATOR')) { return message.reply('You cannot use this command on this user.'); }

    // Cooldowns
    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmout = (command.help.cooldown || 5) * 1000;

    if (tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmout;

        if (timeNow < cdExpirationTime) {
            const timeLeft = (cdExpirationTime - timeNow) / 1000;
            return message.reply(`Hey wait ${timeLeft.toFixed(0)} seconds dude!`);
        }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmout);

    command.run(client, message, args);
};