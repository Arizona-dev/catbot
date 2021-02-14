const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
module.exports = (client) => {

  class Presence extends Commando.Command {
    constructor(client) {
      super(client, {
        name: 'botinfo',
        group: 'misc',
        memberName: 'botinfo',
        description: 'Displays bot information',
      });
    }

    run = async () => {
      let totalMembers = 0
      for (const guild of this.client.guilds.cache) {
        totalMembers += (await guild[1].members.fetch()).size;
      }
      this.client.user.setPresence({ activity: { name: `${totalMembers} utilisateurs`, type: 'LISTENING' } });
    }
  }

  const presence = new Presence(client);
  const channelId = [
    '802205787132526612',
    '809088623986606090'
  ];

  const welcomeChannel = [
    '809041312794804227',
    '753700110864482397'
  ];

  const guilds = client.guilds.cache.map(guild => guild.id);

  const updateMembers = (guild, added) => {
    channelId.map((channel) => {
      const found = guild.channels.cache.get(channel);
      if (found) {
        if (added) {
          found.setName(`🔺 Membres: ${guild.memberCount} 🔺`);
        } else {
          found.setName(`🔻 Membres: ${guild.memberCount} 🔻`);
        }
        presence.run();
      }
      return;
    });
  }
  guilds.map((gld) => {
    updateMembers(client.guilds.cache.get(gld), true);
  });

  const sendWelcome = (member, guild) => {
    welcomeChannel.map((channel) => {
      const found = guild.channels.cache.get(channel);
      if (found) {
        const embed = new MessageEmbed()
          .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
          .setColor("BLUE")
          .setFooter(`${member.displayName} nous à rejoints !`)
          .setTimestamp();
        client.channels.cache.get(found.id).send(embed);
      }
      return;
    });
  }

  const sendGoodbye = (member, guild) => {
    welcomeChannel.map((channel) => {
      const found = guild.channels.cache.get(channel);
      if (found) {
        const embed = new MessageEmbed()
          .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
          .setColor("RED")
          .setFooter(`${member.displayName} viens de nous quitter :(`)
          .setTimestamp();
        client.channels.cache.get(found.id).send(embed);
      }
      return;
    });
  }

  client.on('guildMemberAdd', (member) => {
    sendWelcome(member, member.guild);
    updateMembers(member.guild, true);
  });

  client.on('guildMemberRemove', (member) => {
    sendGoodbye(member, member.guild);
    updateMembers(member.guild, false);
  });
}