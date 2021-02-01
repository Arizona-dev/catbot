const { PREFIX } = require("../../config.js");
const ytdl = require("ytdl-core");
const YouTube = require("discord-youtube-api");
const youtube = new YouTube("AIzaSyCMev-yhKEx4MKIYPGFe-1Z_rmtvm_Vv-U");

module.exports.run = async (client, message, args) => {

  client.queue = new Map();

  let queue = client.queue;

  if (message.author.bot) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${PREFIX}play`)) {
    execute(message, serverQueue);
    return;
  } else if (args[1] === 'skip') {
    skip(message, serverQueue);
    return;
  } else if (args[1] === 'skip') {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send("Commande invalide !");
  }

  async function execute(message, serverQueue) {

    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send(
        "Vous devez être dans un channel vocal !"
      );
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "Je n'ai pas les permissions de rejoindre un vocal ou de parler !"
      );
    }

    music = await youtube.searchVideos(args[1]);
    
    const songInfo = await ytdl.getInfo(music.id);
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} à été ajouté à la playlist !`);
    }
  }

  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Vous devez être dans un channel vocal !"
      );
    if (!serverQueue)
      return message.channel.send("Aucune musique en cours de lecture !");
    serverQueue.connection.dispatcher.end();
  }

  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Vous devez être dans un channel vocal !"
      );
      
    if (!serverQueue)
      return message.channel.send("Aucune musique dans la playlist !");
      
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }

  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      setTimeout(() => {
        serverQueue.voiceChannel.leave();
      }, 30000);
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Lecture en cours: **${song.title}**`);
  }
}

module.exports.help = {
  name: "play",  // nom du fichier
  aliases: ['m'], // alias ou nom du fichier si pas d'alias
  category: 'voice', // nom du dossier 
  description: "Jouez de la musique", // une description
  cooldown: 0, // un cd entre 2 fois la meme commande
  usage: '<command_name>', // si y a des arguments obligatoire
  permissions: false, // permissions de la personne qui fait la commande
  isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
  args: false // besoin d'args
};
