module.exports.run = (client, message) => {
    let time = Date.now();
    message.channel.send('Ping')
        .then((m) => m.edit(`Pong : **${Date.now() - time}**ms`));
};

module.exports.help = {
    name: "ping",  // nom du fichier
    aliases: ['pong'], // alias ou nom du fichier si pas d'alias
    category: 'public', // nom du dossier 
    description: "Renvoie le ping", // une description
    cooldown: 0, // un cd entre 2 fois la meme commande
    usage: '', // si y a des arguments obligatoire
    permissions: false, // permissions de la personne qui fait la commande
    isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
    args: false // besoin d'args
};