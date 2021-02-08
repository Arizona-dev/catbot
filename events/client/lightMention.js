const SerialPort = require('serialport');
const Discord = require("discord.js");
module.exports = (client, user) => {
  serialListener();
  client.on(`message`, async message => {
    if (!message.author.bot) {
      try {
        if (message.content.toLowerCase() === 'zenzen' || message.content.toLowerCase() === 'zhenzhen' || ((message.mentions.users.first() ? message.mentions.users.first().id === '230920595204866050' : false))) {
          turnLedOn();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Et la lumière fut <:sueur:799633182147215401>`)
            .setColor("#1E90FF")
          const msg = await message.channel.send(embed);
          // setTimeout(() => {
          //   msg.delete();
          // }, 5000);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}

function serialListener() {
  const portName = 'COM3'
	Serialport = new SerialPort(portName, {
    baudRate: 57600,
    parser: SerialPort.parsers.Readline,
	});
 
	Serialport.on("open", function () {
	  console.log('Serial COM connecté');
  });
  Serialport.on("data", function (data) {
    console.log('data :', data);
  });
}

function turnLedOn() {
  Serialport.write('1', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('sent');
  })
}