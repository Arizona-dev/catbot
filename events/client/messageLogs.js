const Discord = require("discord.js");
module.exports = (client, user) => {
  client.on(`messageUpdate`, async message => {
    if (!message.author.bot) {
      try {
        const channel = client.channels.cache.find(channel => channel.id === '796162819023831121');
        if (channel && (message.content !== message.reactions.message.content)) {
          const embed = new Discord.MessageEmbed()
            .setTitle(`Un message a été modifié`)
            .setColor("#1E90FF")
            .addField("Auteur", message.author.username)
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
}