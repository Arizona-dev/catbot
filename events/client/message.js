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
    if (command.help.permissions && !message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('Cette commande ne te concerne pas.');
    }

    if (command.help.isMod && !message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.reply('Cette commande ne te concerne pas.');
    }
    // Args
    if (command.help.args && !args.length) {
        let noArgsReply = `Cette commande requière des arguments, ${message.author}!`;

        if (command.help.usage) noArgsReply += `\n Voici comment l'utiliser: \`${PREFIX}${command.help.name} ${command.help.usage}\``;

        return message.channel.send(noArgsReply);
    }

    // Mention
    if (command.help.isUserAdmin && !user) { return message.reply('Vous devez mentionner un membre.'); }

    // Permissions isUserAdmin
    if (command.help.isUserAdmin && message.guild.member(user).hasPermission('ADMINISTRATOR')) {
        return message.reply('Cet utilisateur est plus haut gradé que vous.');
    }

    // Cooldowns
    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmout = (command.help.cooldown || 3) * 1000;

    if (tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmout;

        if (timeNow < cdExpirationTime) {
            const timeLeft = (cdExpirationTime - timeNow) / 1000;
            return message.reply(`Attendez ${timeLeft.toFixed(0)} secondes !`);
        }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmout);

    command.run(client, message, args);
};