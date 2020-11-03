const Discord = require('discord.js');
const client = new Discord.Client();
const { loadBot } = require('./util/loader');
require('dotenv').config();

// Commands and events loading
["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection());
loadBot(client);

// Discord bot client loading
client.login(process.env.TOKEN)
client.on('ready', function () {
    console.log("Je suis connecté !");
  })