const Discord = require("discord.js");
module.exports = (client, user) => {
  client.on(`message`, async message => {
    if (!message.author.bot && message.channel.id !== '798645245981491230') {
      const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
      try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
          if (message.author.id === message.guild.ownerID) return;
          await message.delete();
          await message.channel.send(`**Nique ta mère**`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
  client.on(`messageUpdate`, async message => {
    if (!message.author.bot && message.channel.id !== '798645245981491230') {
      const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
      try {
        if (bannedWords.some(word => message.reactions.message.content.toLowerCase().includes(word))) {
          if (message.author.id === message.guild.ownerID) return;
          await message.delete();
          await message.channel.send(`**Nique ta mère**`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}