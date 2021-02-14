const ms = require("ms");

module.exports.run = async (client, message, args) => {
  let memberRole = message.guild.roles.cache.find(r => r.name === 'Membre');
  let muteTime = (args[0] || '5s');
  if (memberRole) {
    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(memberRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      });
    });
    message.channel.send(`Le serveur a été muté pour ${ms(ms(muteTime))}.`);
    setTimeout(() => {
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(memberRole, {
          SEND_MESSAGES: null,
          ADD_REACTIONS: null,
          CONNECT: null
        });
      });
    }, ms(muteTime));
  } else {
    message.channel.send(`Le rôle **Membre** n'existe pas.`);
  }
};

module.exports.help = {
  name: "mute-all",
  aliases: ['ma'],
  category: 'mods',
  description: "Mute un utilisateur",
  cooldown: 0,
  usage: '<time>',
  permissions: true,
  isUserAdmin: false,
  args: false
};