module.exports.run = (client, message) => {
  const { guild } = message

  guild.fetchInvites().then((invites) => {
    const inviteCounter = {
    }

    invites.forEach((invite) => {
      const { uses, inviter } = invite
      const { username, discriminator } = inviter

      const name = `${username}#${discriminator}`

      inviteCounter[name] = (inviteCounter[name] || 0) + uses
    })

    let replyText = 'Invitations :'

    const sortedInvites = Object.keys(inviteCounter).sort(
      (a, b) => inviteCounter[b] - inviteCounter[a]
    )

    sortedInvites.length = 4

    for (const invite of sortedInvites) {
      const count = inviteCounter[invite]
      replyText += `\n${invite} a invité(e) ${count} Membre(s)!`
    }

    message.reply(replyText)
  });
}

module.exports.help = {
  name: "invites",  // nom du fichier
  aliases: ['ivt'], // alias ou nom du fichier si pas d'alias
  category: 'public', // nom du dossier 
  description: "Affiche le nombre d\'invitations par membres.", // une description
  cooldown: 0, // un cd entre 2 fois la meme commande
  usage: '<command_name>', // si y a des arguments obligatoire
  permissions: false, // permissions de la personne qui fait la commande
  isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
  args: false // besoin d'args
};