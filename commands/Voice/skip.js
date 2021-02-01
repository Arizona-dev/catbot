const { PREFIX } = require("../../config.js");
const ytdl = require("ytdl-core");
const YouTube = require("discord-youtube-api");
const youtube = new YouTube("AIzaSyCMev-yhKEx4MKIYPGFe-1Z_rmtvm_Vv-U");

module.exports.run = async (client, message, args) => {

  const queue = new Map();

  if (message.author.bot) return;

  const serverQueue = queue.get(message.guild.id);

  skip(message, serverQueue);
  return;

  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Vous devez être dans un channel vocal !"
      );
    if (!serverQueue)
      return message.channel.send("Aucune musique en cours de lecture !");
    serverQueue.connection.dispatcher.end();
  }
}

module.exports.help = {
  name: "skip",  // nom du fichier
  aliases: ['skip'], // alias ou nom du fichier si pas d'alias
  category: 'voice', // nom du dossier 
  description: "Jouez de la musique", // une description
  cooldown: 0, // un cd entre 2 fois la meme commande
  usage: '<command_name>', // si y a des arguments obligatoire
  permissions: false, // permissions de la personne qui fait la commande
  isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
  args: false // besoin d'args
};
