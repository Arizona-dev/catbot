const Discord = require("discord.js");
require('dotenv').config();
const Questions = require('../../questions.json');
const fs = require('fs');
const path = require('path');

module.exports.run = async (client, message) => {
    var max = Object.keys(Questions).length;
    var number = Math.floor(Math.random() * max) + 1;

    let rawdata = fs.readFileSync(path.resolve('./', 'questions.json'));
    let question = JSON.parse(rawdata);

    const embed = new Discord.MessageEmbed()
            .setColor("#1E90FF")
            .addField("Est-ce que tu préfères :", `${Questions[number].question}`);

    message.channel.send(embed)
    .then(async (msg) => {
        for (emoji of ['🅰', '🅱']) await msg.react(emoji);
        msg.awaitReactions((reaction) => (reaction.emoji.name == "🅰" || reaction.emoji.name == "🅱"),
            { max: 20, time: 4000 })
        .then(collected => {
            let A = Questions[number].answers[0];
            let B = Questions[number].answers[1];
            question[number].answers[0]++;
            A = A+collected.first().count-1;
            question[number].answers[1]++;
            B = B+collected.last().count-1;
            fs.writeFileSync(path.resolve('./', 'questions.json'), JSON.stringify(question, null, 4));
            if (collected.first().id === collected.last().id)
            message.channel.send(`${(collected.first().count > 1 ? collected.first().count : 0)} votes pour 🅰 | ${A} ont précédemment voté 🅰 \n${(collected.last().count > 1 ? collected.last().count : 0)} votes pour 🅱 | ${B} ont précédemment voté 🅱`);
        })
        .catch((err) => {
            console.log(err);
            return message.reply("Pas de réponse, Question annulé");
        })
    })
};

module.exports.help = {
    name: "wyr",  // nom du fichier
    aliases: ['wyr'], // alias ou nom du fichier si pas d'alias
    category: 'public', // nom du dossier 
    description: "Est-ce que tu préfère :", // une description
    cooldown: 0, // un cd entre 2 fois la meme commande
    usage: '<command_name>', // si y a des arguments obligatoire
    permissions: false, // permissions de la personne qui fait la commande
    isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
    args: false // besoin d'args
};
