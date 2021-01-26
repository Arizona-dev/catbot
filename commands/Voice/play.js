const Commando = require('discord.js-commando');
const path = require('path');

module.exports.run = async (client, message, args) => {
  const play = new PlayAudioCommand(client);
  play.run(message, args);
}

class PlayAudioCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'voice',
      memberName: 'play',
      description: 'Plays some audio',
    });
  }

  async run(message, args) {
    const directory = __dirname + '/../../public/sounds/';
    const { voice } = message.member;

    if (!voice.channelID) {
      message.reply('You must be in a voice channel')
      return
    }

    if (args[0] === 'ntm') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(directory, 'niquetamere.mp3'));
      });
    } else if (args[0] === 'zebi') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(directory, 'laissemoidormirzebi.mp3'));
      });
    } else if (args[0] === 'respect') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(directory, 'respectmongarcon.mp3'));
      });
    } else if (args[0] === 'ps4') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(directory, 'pourquoi-ta-eteint-la-play.mp3'));
      });
    } else if (args[0] === 'kouisine') {
      voice.channel.join().then((connection) => {
        connection.play(path.join(directory, 'kouisine.mp3'));
      });
    } else if (args[0] === 'humiliation') {
      sound(message, 'humiliation.mp3');
    } else {
      message.reply('zebi - kouisine - ps4 - ntm - humiliation - respect');
    }
  }
}

module.exports.help = {
  name: "play",  // nom du fichier
  aliases: ['sound'], // alias ou nom du fichier si pas d'alias
  category: 'voice', // nom du dossier 
  description: "Jouez de la musique", // une description
  cooldown: 0, // un cd entre 2 fois la meme commande
  usage: '<command_name>', // si y a des arguments obligatoire
  permissions: false, // permissions de la personne qui fait la commande
  isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
  args: false // besoin d'args
};
