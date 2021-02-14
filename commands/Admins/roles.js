const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {

  let guildId;
  let channelId;
  let messageId;
  if (!message.author.bot) {
    if (!args) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Rôles`)
        .setColor("#1E90FF")
        .addField("Configuration", `Ecrivez maintenant *updateRole suivi des arguments ci-dessous dans l'ordre.`)
        .addField("Id du message", `Copiez collez l'identifiant de mon message`)
        .addField("Nom du message", `Entrez le titre du message`)

      message.channel.send(embed);

    } else {
      const message_id = args[0];
      const message_title = args.slice(1).join(" ");
      console.log(message_id, message_title);
      await createRoles(message.guild.id, message_id, message_title);
      console.log(roles);
    }
  }
  


  async function createRoles(guild_id, message_id, message_title) {
    const { roles } = client.app.models;

    return roles.create({
      guild_id,
      message_id,
      title: message_title
    }, (err, result) => {
      if (err) return console.log(err);
      return result;
    });
  }
}

module.exports.help = {
  name: "roles",
  aliases: ['roles'],
  category: 'admins',
  description: "Créer des rôles automatiques",
  cooldown: 0,
  usage: '<message_id> <nom du message>',
  permissions: true,
  isUserAdmin: false,
  args: true
};