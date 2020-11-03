const { MessageEmbed } = require('discord.js');

module.exports = (client, member) => {
  const embed = new MessageEmbed()
    .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
    .setColor("red")
    .setFooter("A new member has joined us !")
    .setTimestamp();

  client.channels.cache.get('767891600440557608').send(embed);
};
