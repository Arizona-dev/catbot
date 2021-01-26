module.exports = (client) => {
  const channelId = '802205787132526612';

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId);
    channel.setName(`Membres: ${guild.memberCount.toLocaleString()}`);
  }
  client.on('guildMemberAdd', (member) => updateMembers(member.guild));
  client.on('guildMemberRemove', (member) => updateMembers(member.guild));

  const guild = client.guilds.cache.get('753700110864482395');
  updateMembers(guild);
}