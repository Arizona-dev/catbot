const ms = require("ms");

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first());
  let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
  let muteTime = (args[1] || '60s');

  if (!muterole) {
    muterole = await message.guild.roles.create({
      data: {
        name: 'Muted',
        color: '#FF000',
        permissions: []
      }
    });

    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      })
    })
  }

  const isMuted = user.roles._roles.find(r => r.name === 'Muted');

  if (isMuted) {
    await user.roles.remove(muterole.id);
    message.channel.send(`<@${user.id}> a été démuté.`);
  }

};

module.exports.help = {
    name: "unmute",
    aliases: ['um'],
    category: 'mods',
    description: "Démute un utilisateur",
    cooldown: 0,
    usage: '<@mention>',
    permissions: true,
    isUserAdmin: true,
    args: true
};