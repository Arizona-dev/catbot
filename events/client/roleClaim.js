const roles_1 = require('./Messages/roles_1');

module.exports = (client) => {
  const channelId = '821886177543323749'

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const emojis = {
    nani: '1',
    nya: '2',
    run: '3',
  }

  const reactions = []

  let emojiText = '```Réagissez aux réactions qui vous correspondent pour recevoir le rôle associé.```\n';
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} = ${role}\n\n`
  }
  emojiText += `_ _`

  roles_1(client, channelId, emojiText, reactions);

  const handleReaction = (reaction, user, add) => {
    if (user.id === '769273143016816700') {
      return
    }

    const emoji = reaction._emoji.name

    const { guild } = reaction.message

    const roleName = emojis[emoji]
    if (!roleName) {
      return
    }

    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}
