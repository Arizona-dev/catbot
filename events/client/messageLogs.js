const Discord = require("discord.js");
module.exports = (client, user) => {
  const guild_channel_id = [
    {
      'guild_id': '753700110864482395',
      'channel_id': '796162819023831121'
    },
    {
      'guild_id': '809037834837032970',
      'channel_id': '809078759327793164'
    }
  ];

  const channels = (guild) => {
    const data = guild_channel_id.find((channel) => guild === channel.guild_id);
    return data.channel_id;
  }

  client.on(`messageUpdate`, async message => {
    
    if (!message.author.bot) {
      try {
        const channel_id = channels(message.guild.id);

        const channel = client.channels.cache.find(channel => channel.id === channel_id);

        if (channel && (message.content !== message.reactions.message.content)) {
          const embed = new Discord.MessageEmbed()
            .setTitle(`Un message a été modifié`)
            .setColor("#1E90FF")
            .addField("Auteur", message.author.tag)
            .addField("Ancien message", message)
            .addField("Nouveau message", message.reactions.message.content)
            .addField("Date de création", `${new Date(message.createdAt).toUTCString()}`)
            .addField("Date de modification", `${new Date(message.reactions.message.editedTimestamp).toUTCString()}`)
            .addField("Lien du message", `${message.url}`)

          channel.send(embed);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
  client.on(`messageDelete`, async message => {
    if (!message.author.bot) {
      try {
        const channel_id = channels(message.guild.id);

        const channel = client.channels.cache.find(channel => channel.id === channel_id);

        if (channel && message.reactions.message.deleted) {
          const embed = new Discord.MessageEmbed()
            .setTitle(`Un message a été supprimé par ${message.author.tag}`)
            .setColor("#1E90FF")
            .addField("Message", message)
            .addField("Date de création", `${new Date(message.createdAt).toUTCString()}`)

          channel.send(embed);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}