const Discord = require("discord.js");
const config = require("../../config.js");
const fetch = require("node-fetch");

module.exports.run = (client, message, args) => {

    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .addField("Delamain", `Un chauffeur va venir vous chercher dans quelques instants...`)


    message.channel.send(embed);
    let filter = m => m.author.id === message.author.id

    setTimeout(async () => {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .addField("Delamain", `Votre chauffeur est arrivé, ou souhaitez vous aller ?`)
        message.channel.send(embed)
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        })
        .then(async (message) => {
            msg = message.first();
            await fetchData(msg);
        })
    }, 1000);

    fetchData = async (msg) => {
        const data = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${msg.content}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(await data.json()
            .then((data) => {
                const res = data.features[0];
                
                msg.channel.send('Est-ce bien votre destination ?\n\n' + res.properties.name + ', ' + res.properties.city + ' (' + res.properties.citycode + ')\n' + `https://www.google.fr/maps/search/${res.properties.label.replace(/\s/g, '%20')}/@${res.geometry.coordinates[1]},${res.geometry.coordinates[0]},17z`);
                console.log(res);
            })
        );
        // .then((data) => {
        //     console.log(data.text());
        //     msg.channel.send(data);
        // })
    }

};

module.exports.help = {
    name: "taxi",
    aliases: ['t'],
    category: 'public',
    description: "Appelez un taxi",
    cooldown: 0,
    usage: "<command_name>",
    permissions: false,
    isUserAdmin: false,
    args: false

};
