const Discord = require("discord.js");
module.exports = (client, user) => {
  client.on(`message`, async message => {
    if (!message.author.bot) {
      try {
        // || ((message.mentions.users.first() ? message.mentions.users.first().id === '752940390591758346' : false))
        if (message.content.toLowerCase() === 'sabrina') {
          const embed = new Discord.MessageEmbed()
            .setTitle(`💕 La femme de Créateur 💕`)
            .setColor("#1E90FF")
            .addField("C'est la plus belle", 'Respectez la ou moi Délamaine, vous monte en l\'air <a:punch0:800487413814132746>')

          message.channel.send(embed);
          // || ((message.mentions.users.first() ? message.mentions.users.first().id === '230920595204866050' : false))
        } else if (message.content.toLowerCase() === 'zhenzhen') {
          const embed = new Discord.MessageEmbed()
            .setTitle(`💕 L'homme de Sabrina 💕`)
            .setColor("#1E90FF")
            .addField("C'est le plus bg", 'Respectez le ou moi Délamaine, vous monte en l\'air <a:punch0:800487413814132746>')

          message.channel.send(embed);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}