const Commando = require('discord.js-commando')
const path = require('path')

module.exports.run = async (client, message, args) => {
  const play = new PlayAudioCommand(client);
  play.run(message, args);
}

class PlayAudioCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'playaudio',
      group: 'misc',
      memberName: 'playaudio',
      description: 'Plays some audio',
    })
  }

  async run(message, args) {
    const { voice } = message.member

    if (!voice.channelID) {
      message.reply('You must be in a voice channel')
      return
    }

    if (args[0] === 'ntm') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(__dirname, 'niquetamere.mp3'))
        .on('finish', () => {
          voice.channel.leave();
        })
      });
    } else if (args[0] === 'humiliation') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(__dirname, 'humiliation.mp3'));
      });
    } else if (args[0] === 'zebi') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(__dirname, 'laissemoidormirzebi.mp3'));
      });
    } else if (args[0] === 'respect') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(__dirname, 'respectmongarcon.mp3'));
      });
    } else if (args[0] === 'ps4') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(__dirname, 'pourquoi-ta-eteint-la-play.mp3'));
      });
    }
    // voice.channel.join().then((connection) => {
    //   connection.play(path.join(__dirname, 'niquetamere.mp3'));
    // });

  }
}

module.exports.help = {
  name: "playAudio",  // nom du fichier
  aliases: ['play'], // alias ou nom du fichier si pas d'alias
  category: 'public', // nom du dossier 
  description: "Jouez de la musique", // une description
  cooldown: 0, // un cd entre 2 fois la meme commande
  usage: '', // si y a des arguments obligatoire
  permissions: false, // permissions de la personne qui fait la commande
  isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
  args: false // besoin d'args
};
