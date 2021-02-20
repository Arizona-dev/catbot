const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const { version } = require('../../package.json');
const { PREFIX } = require('../../config');

module.exports.run = async (client, message, args) => {
  const play = new BotInfoCommand(client);
  play.run(message, args);
}

class BotInfoCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      group: 'misc',
      memberName: 'botinfo',
      description: 'Displays bot information',
    });
  }

  run = async (message) => {
    let totalMembers = 0

    for (const guild of this.client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size;
    }

    const embed = new MessageEmbed()
      .setAuthor(
        `A propos de ${this.client.user.username}`,
        this.client.user.displayAvatarURL()
      )
      .addFields(
        {
          name: 'Créateur',
          value: `<@230920595204866050>`,
          inline: true
        },
        {
          name: 'Version',
          value: version,
          inline: true
        },
        {
          name: "Prefix",
          value: PREFIX,
          inline: true
        },
        {
          name: 'A disposition sur',
          value: `${this.client.guilds.cache.size} serveurs`,
          inline: true
        },
        {
          name: "A l'écoute de",
          value: `${totalMembers} membres`,
          inline: true
        }
      );

    message.channel.send(embed);
  }
};

module.exports.help = {
    name: "delamain",
    aliases: ['delamain'],
    category: 'public',
    description: "A propos de Delamain",
    cooldown: 0,
    usage: "<command_name>",
    permissions: false,
    isUserAdmin: false,
    args: false

};
