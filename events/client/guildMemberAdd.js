const { MessageEmbed } = require('discord.js');

module.exports = (client, member) => {
  const embed = new MessageEmbed()
    .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
    .setColor("red")
    .setFooter("Un nouveau membre nous à rejoins !")
    .setTimestamp();

  client.channels.cache.get('753700110864482397').send(embed);
};