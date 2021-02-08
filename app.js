const Discord = require('discord.js');
const client = new Discord.Client();
const { loadBot } = require('./util/loader');
require('dotenv').config();
const express = require('express');

// Loading api
const app = express();
client.app = app;
require('./boot')(client.app);
require('./config/index')(client.app);
require('./middlewares')(client.app);
require('./models')(client.app);
require('./services')(client.app);
require('./actions')(client.app);
require('./routes')(client.app);

// Commands and events loading
["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection());
loadBot(client);

// Discord bot client loading
client.login(process.env.TOKEN)
client.on('ready', function () {
  console.log("Je suis connecté !");
});


client.app.boot(client.app.config.port, client.app.config.host);

client.app.get('/', function(req, res) {
  res.send('hello world');
});