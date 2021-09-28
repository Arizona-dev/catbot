const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports.run = async (client, message, args) => {
  const play = new UserInfoCommand(client);
  play.run(message, args);
}

class UserInfoCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      group: 'misc',
      memberName: 'userinfo',
      description: 'Displays information of a user',
    });
  }

  run = async (message) => {
    const { guild, channel } = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id);

    const embed = new MessageEmbed()
      .setAuthor(`Carte d'identité`, user.displayAvatarURL())
      .addFields(
        {
          name: 'Membre',
          value: `<@${user.id}>`,
          inline: true
        },
        {
          name: 'Alias',
          value: member.nickname || 'Null',
          inline: true
        },
        {
          name: 'A rejoint le',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
          inline: true
        },
        {
          name: 'Compte crée le',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
          inline: true
        },
        {
          name: 'Nombre de rôles',
          value: member.roles.cache.size - 1,
          inline: true
        }
      );

    channel.send(embed);
  }
};

module.exports.help = {
    name: "russian-roulette",
    aliases: ['rr'],
    category: 'public',
    description: "Roulette Russe",
    cooldown: 0,
    usage: "<command_name> @user <nb de balles 1 à 6>",
    permissions: false,
    isUserAdmin: false,
    args: false
};
