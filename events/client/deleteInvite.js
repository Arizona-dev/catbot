const Discord = require("discord.js");
module.exports = (client, user) => {
  client.on(`message`, async message => {
    if (!message.author.bot && message.channel.id !== '815907332780195860') {
      const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
      try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
          if (message.author.id === message.guild.ownerID) return;
          await message.delete();
          await message.channel.send(`**Nique ta mère**`);
          const embed = new Discord.MessageEmbed()
            .setTitle(`Un lien d'invitation à été publié`)
            .setColor("#1E90FF")
            .addField("Auteur", message.author.username, true)
            // .addField("Message", message, true)

            message.channel.send(embed);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
  client.on(`messageUpdate`, async message => {
    if (!message.author.bot && message.channel.id !== '815907332780195860') {
      const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
      try {
        if (bannedWords.some(word => message.reactions.message.content.toLowerCase().includes(word))) {
          if (message.author.id === message.guild.ownerID) return;
          await message.delete();
          await message.channel.send(`**Nique ta mère**`);
          const embed = new Discord.MessageEmbed()
            .setTitle(`Un lien d'invitation à été publié`)
            .setColor("#1E90FF")
            .addField("Auteur", message.author.username, true)
            .addField("Message", message, true)

            message.channel.send(embed);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}