const Discord = require("discord.js");
const config = require("../../config.js");

module.exports.run = (client, message, args) => {
  const defaultEmbed = new Discord.MessageEmbed()
    .setTitle("Calcul de votre IMC")
    .setColor("#1E90FF")
    .addField("Pour calculer votre IMC", `Entrez votre taille en Centimètre ainsi que votre poids en Kg\nEcrivez \`${config.PREFIX}imc <taille en cm> <poids en kg>`)
    .addField("Taille", `Entrez votre taille en Centimètre: entre 100 Cm et 220 Cm`)
    .addField("Poids", `Entrez votre poids en Kilogrammes: entre 30 Kg et 300 Kg`);

    if (!args.length) {
      return message.channel.send(defaultEmbed);
    } else {
      const height = args[0];
      const weight = args[1];
      let scale = '';
      if (height < 100 || height > 220) {
        return message.channel.send(defaultEmbed);
      } else if (weight < 30 || weight > 300) {
        return message.channel.send(defaultEmbed);
      }
      const imc = ((weight * 10000)/(height * height)).toFixed(2);
      if (isNaN(imc)) {
        return message.channel.send(defaultEmbed);
      }

      if (imc < 18.5) {
        scale = 'Maigreur';
      } else if (imc <= 25) {
        scale = 'Normal';
      } else if (imc <= 30) {
        scale = 'Surpoids';
      } else if (imc <= 50) {
        scale = 'Obésité';
      } else if (imc > 50) {
        scale = 'T\'as cassé la balance fdp';
      }

      const embed = new Discord.MessageEmbed()
        .setTitle(`Calcul de votre IMC`)
        .setColor("#1E90FF")
        .addField("Taille", `${height}`, true)
        .addField("Poids", `${weight}`, true)
        .addField("IMC", `${imc} : ${scale}`, true)
        .setImage('https://www.sport-passion.fr/pictures/echelle-imc-classification.png');
      return message.channel.send(embed);
    }
};

module.exports.help = {
    name: "imc",
    aliases: ['imc'],
    category: 'public',
    description: "Calculer votre indice de masse corporelle.",
    cooldown: 0,
    usage: `${config.PREFIX}imc <taille en cm> <poids en kg>`,
    permissions: false,
    isUserAdmin: false,
    args: false

};
