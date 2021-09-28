const Discord = require("discord.js");
module.exports = (client, user) => {
  const guild_channel_id = [
    {
      'guild_id': '821780662155083806',
      'channel_id': '821886177543323749'
    }
  ];

  const channels = (guild) => {
    const data = guild_channel_id.find((channel) => guild === channel.guild_id);
    return data.channel_id;
  }

  client.on(`messageUpdate`, async message => {
    
    if (!message.author.bot) {
      try {
        const channel_id = channels(message.guild.id);

        const channel = client.channels.cache.find(channel => channel.id === channel_id);

        if (channel && (message.content !== message.reactions.message.content)) {
          const embed = new Discord.MessageEmbed()
            .setTitle(`Un message a été modifié`)
            .setColor("#1E90FF")
            .addField("Auteur", message.author.tag)
            .addField("Ancien message", message)
            .addField("Nouveau message", message.reactions.message.content)
            .addField("Date de création", `${new Date(message.createdAt).toUTCString()}`)
            .addField("Date de modification", `${new Date(message.reactions.message.editedTimestamp).toUTCString()}`)
            .addField("Lien du message", `${message.url}`)

          channel.send(embed);
        }
      } catch (e) {
        console.log('Channel inconnu', e);
      }
    }
  });
  client.on(`messageDelete`, async message => {
    if (!message.author.bot) {
      try {
        const channel_id = channels(message.guild.id);
        const channel = client.channels.cache.find(channel => channel.id === channel_id);

        await Discord.Util.delayFor(900);

        // Fetch a couple audit logs than just one as new entries could've been added right after this event was emitted.
        const fetchedLogs = await message.guild.fetchAuditLogs({
          limit: 6,
          type: 'MESSAGE_DELETE'
        }).catch(() => ({
          entries: []
        }));

        const auditEntry = fetchedLogs.entries.find(a =>
          // Small filter function to make use of the little discord provides to narrow down the correct audit entry.
          a.target.id === message.author.id &&
          a.extra.channel.id === message.channel.id &&
          // Ignore entries that are older than 20 seconds to reduce false positives.
          Date.now() - a.createdTimestamp < 20000
        );

        const executor = auditEntry ? auditEntry.executor.tag : 'Inconnu';

        if (channel && message.reactions.message.deleted) {
          const embed = new Discord.MessageEmbed()
            .setTitle("MESSAGE EFFACÉ")
            .setColor("#1E90FF")
            .addField("Auteur", message.author.tag, true)
            .addField("Supprimé par", executor, true)
            .addField("Channel", message.channel, true)
            .addField("Message", message.content || "**Aucun message**")
            .setFooter(`Message ID: ${message.id} | Author ID: ${message.author.id}`);

          channel.send(embed);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}