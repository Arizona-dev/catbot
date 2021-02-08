const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const url = 'https://www.youtube.com/watch?v=sBo52--2XU4';
const lame = require("@suldashi/lame");
const Speaker = require('speaker');
var ffmpeg = require('fluent-ffmpeg');

module.exports = (client, user) => {
  client.on(`message`, async message => {
    if (!message.author.bot) {
      try {
        if (message.content.toLowerCase() === '*fdp') {
          playYoutube();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Et la musique fut <:sueur:799633182147215401>`)
            .setColor("#1E90FF")
          const msg = await message.channel.send(embed);
          setTimeout(() => {
            msg.delete();
          }, 5000);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}


function playYoutube(url) {
  var dl = ytdl(url, {
	  filter: function(format) { return format.container === 'mp4'; }
  });
  var converter = ffmpeg(dl).format('mp3').pipe(new lame.Decoder())
	.on('format', function (format) {
		this.pipe(new Speaker(format));
  });
}

