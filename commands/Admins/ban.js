module.exports.run = (client, message, args) => {
    const user = message.mentions.users.first();
    const reason = args.splice(1).join(" ");

    user ? message.guild.member(user).ban(reason) : message.channel.send("This user dosen\'t exist.")
};

module.exports.help = {
    name: "ban",
    aliases: ['ban'],
    category: 'admins',
    description: "Bans a user",
    cooldown: 30,
    usage: '<@mention> <reason>',
    permissions: true,
    isUserAdmin: true,
    args: true
};