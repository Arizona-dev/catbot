const Discord = require("discord.js");
const config = require("../../config.js");
const fetch = require("node-fetch");

module.exports.run = (client, message, args) => {

    const embed = new Discord.MessageEmbed()
        .setTitle("Delamain")
        .setColor("RANDOM")
        .addField("Pour vous servir", `Un chauffeur va venir vous chercher dans quelques secondes, Autre chose ?`)


    message.channel.send(embed);
    let filter = m => m.author.id === message.author.id

    setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Delamain")
        .setColor("RANDOM")
        .addField("Pour vous servir", `Votre chauffeur est arrivé, ou souhaitez vous aller ?`)
        message.channel.send(embed)
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        })
        .then(message => {
            msg = message.first()
            fetch(`https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port`)
            .then((data) => {
                console.log(data.json());
            })
        })
    }, 2000);

};

module.exports.help = {
    name: "taxi",
    aliases: ['t'],
    category: 'public',
    description: "Appeler un taxi",
    cooldown: 0,
    usage: "<command_name>",
    permissions: false,
    isUserAdmin: false,
    args: false

};
