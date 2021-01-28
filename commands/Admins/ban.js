const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    let days = 0;
    const reason = args.splice(2, 1).join(' ');

    if (args.splice(1, 1) === NaN) {
        return days;
    } else {
        days = args.splice(1, 1);
    }

    user = user.toString();
    if (user.includes("!")) {
        user = user.split("!")[1].split(">")[0];
    } else {
        user = user.split("@")[1].split(">")[0];
    }
    const banUser = message.member.user.username;

    const banEmbed = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setTitle('CatBot')
	.setDescription('Le marteau du président de la cour a frappé !')
	.setThumbnail('https://i.pinimg.com/originals/8d/83/4e/8d834eb571cdfe4abfeebf72e15e7ea3.jpg')
	.addField(`À la barre : ${banUser} (${user})`, `L\'accusé est déclaré coupable pour : \n -${reason} \n\n Et se voit recevoir la décision de la cour qui est un Bannissement définitif ! \nLa sentence est irrévocable !`, true)
	.setImage('https://media1.tenor.com/images/d856e0e0055af0d726ed9e472a3e9737/tenor.gif?itemid=8540509')
	.setTimestamp()
    .setFooter('La session est terminée.');
    
    const messages = await message.channel.messages.fetch({
        limit: 1
    });

    await message.channel.bulkDelete(messages);
    user ? message.guild.member(user).ban({
        days: (Number.isInteger(Number.parseInt(days)) ? days : 0),
        reason
    }) : message.channel.send("Cet utilisateur n'existe pas.");
    await message.channel.send(banEmbed);

};

module.exports.help = {
    name: "ban",
    aliases: ['ban'],
    category: 'admins',
    description: "Ban un utilisateur",
    cooldown: 0,
    usage: '<@mention> <nombre de jours des messages à effacer - max 7, 0 par défaut> <raison>',
    permissions: true,
    isUserAdmin: true,
    args: true
};