const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const lame = require("@suldashi/lame");
const Speaker = require('speaker');
var ffmpeg = require('fluent-ffmpeg');
var volume = require("pcm-volume");
let config = require("../../config.json");
const fs = require('fs');
const path = require('path');

module.exports.run = async (client, message, args) => {

  if (message.author.bot) return;

  queue = new Map();
  const serverQueue = queue.get(message.guild.id);
  const url = args[0];
  let vol = config.volume;
  const vols = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  if (message.author.id === '230920595204866050' && (vols.find(vola => parseInt(url[0]) === vola))) {
    try {
      vols.map(async vola => {
        if (parseInt(url) === vola) {
          const volumeConfig = {
            volume: vola/10
          };
          const jsonString = JSON.stringify(volumeConfig, null, 1);
          console.log(jsonString);
          saveVolume(jsonString);
          const embed = new Discord.MessageEmbed()
            .setTitle(`Volume des son`)
            .setColor("#1E90FF")
            .addField('Volume à ', `${vola*10}%`)
          const msg = await message.channel.send(embed);
          setTimeout(() => {
            msg.delete();
          }, 5000);
        }
      });
    } catch (e) {
      console.log(e);
    }
  } else if (url === undefined) {
    const embed = new Discord.MessageEmbed()
    .setTitle(`Url de la vidéo youtube incorrecte`)
    .setColor("#1E90FF");
    await message.channel.send(embed);
    return;
  } else {
    if (url === 'https://www.youtube.com/watch?v=MJdz3i44dIc') {
      const songInfo = await ytdl.getInfo('https://www.youtube.com/watch?v=MJdz3i44dIc');
      const embed = new Discord.MessageEmbed()
        .setTitle(`Et la musique fut <:sueur:799633182147215401>`)
        .setColor("#1E90FF")
        .addField('Lecture en cours', `**${songInfo.videoDetails.title}**`);
      await message.channel.send(embed);  
      return console.log('hehe raté');
    }
    playYoutube(serverQueue, url);
    async function playYoutube(serverQueue, url) {

      if (!serverQueue) {
        let songInfo;
        try {
          songInfo = await ytdl.getInfo(url);
        } catch (e) {
          message.channel.send('Url Youtube incorrecte CHEH !');
          return;
        }
        const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
        };
        const queueContruct = {
          textChannel: message.channel,
          songs: [],
          volume: 5,
          playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
          play(message.guild, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} à été ajouté à la playlist, casse les couilles !`);
      }
    }

    async function play(guild, song) {
      const serverQueue = queue.get(guild.id);
      if (!song) {
        queue.delete(guild.id);
        return;
      }
      var v = new volume();
      v.setVolume(vol);
      var dl = ytdl(song.url, {
        filter: function(format) { return format.container === 'mp4'; }
      });
      const stream = ffmpeg(dl).format('mp3').pipe(new lame.Decoder())
      .on('format', function (format) {
        this.pipe(v);
        v.pipe(new Speaker(format));
      })
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
      setTimeout(() => {
        stream.unpipe();
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      }, 5000);

      const embed = new Discord.MessageEmbed()
        .setTitle(`Et la musique fut <:sueur:799633182147215401>`)
        .setColor("#1E90FF")
        .addField('Lecture en cours', `**${song.title}**`)
      await message.channel.send(embed);
    }
  }

  function saveVolume(jsonString) {
    fs.writeFileSync(path.resolve('./', 'config.json'), jsonString, err => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  }
}

module.exports.help = {
  name: "scareMe",  // nom du fichier
  aliases: ['fdp'], // alias ou nom du fichier si pas d'alias
  category: 'voice', // nom du dossier 
  description: "Jouez un son youtube chez ZhenZhen, fait pas le fdp", // une description
  cooldown: 60, // un cd entre 2 fois la meme commande
  usage: '<command_name>', // si y a des arguments obligatoire
  permissions: false, // permissions de la personne qui fait la commande
  isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
  args: false // besoin d'args
};
