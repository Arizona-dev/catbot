const Discord = require("discord.js");
module.exports = (client, user) => {
  client.on(`message`, async message => {
    if (!message.author.bot) {
      const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
      try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
          if (message.author.id === message.guild.ownerID) return;
          await message.delete();
          await message.channel.send(`Bouge tes liens d'invite`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
  client.on(`messageUpdate`, async message => {
    if (!message.author.bot) {
      const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
      try {
        const channel = client.channels.cache.find(channel => channel.id === '796162819023831121');
        if (channel) {
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
        if (bannedWords.some(word => message.reactions.message.content.toLowerCase().includes(word))) {
          if (message.author.id === message.guild.ownerID) return;
          await message.delete();
          await message.channel.send(`Bouge tes liens d'invite`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}