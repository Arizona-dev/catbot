const {MessageEmbed} = require("discord.js");

module.exports.run = (client, message) => {
    const botPing = Math.round(client.ws.ping);
    message.channel.send('pong :ping_pong:').then(m => {
        const embed = new MessageEmbed()
            .setTitle('Latencies')
            .setColor('#1AECFF')
            .addField('API', botPing + 'ms')
            .addField('Bot', (m.createdTimestamp - message.createdTimestamp) + 'ms');

        message.channel.send(embed);
    });
};

module.exports.help = {
    name: "ping",  // nom du fichier
    aliases: ['pong'], // alias ou nom du fichier si pas d'alias
    category: 'public', // nom du dossier 
    description: "Renvoie le ping", // une description
    cooldown: 0, // un cd entre 2 fois la meme commande
    usage: '<command_name>', // si y a des arguments obligatoire
    permissions: false, // permissions de la personne qui fait la commande
    isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
    args: false // besoin d'args
};