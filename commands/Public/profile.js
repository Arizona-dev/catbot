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
      description: 'Displays information a user',
    });
  }

  run = async (message) => {
    const { guild, channel } = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id);

    const embed = new MessageEmbed()
      .setAuthor(`Votre identité ${user.username}`, user.displayAvatarURL())
      .addFields(
        {
          name: 'Numéro du membre :',
          value: user.tag,
        },
        {
          name: 'Nom :',
          value: member.nickname || 'None',
        },
        {
          name: 'Inscrit depuis le :',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: 'Née le :',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: 'Nombre de rôles :',
          value: member.roles.cache.size - 1,
        }
      );

    channel.send(embed);
  }
};

module.exports.help = {
    name: "profile",
    aliases: ['p'],
    category: 'public',
    description: "Voir les informations du membre",
    cooldown: 0,
    usage: "<command_name> @user",
    permissions: false,
    isUserAdmin: false,
    args: false

};
