const roles_1 = require('./Messages/roles_1');
const fs = require('fs');
const path = require('path');
const rolesData = require('../../roles.json');
const mongo = require('../../mongo');
const Discord = require("discord.js");

module.exports = (client) => {
  // const channelId = '796844120768774154'
  // Setting data from website
  // const guildId = message.guild.id;
  // const channelId = '807217203367510016';

  let guildId;
  let channelId;
  let messageId;

  // client.on('message', async (message) => {
  //     if (!message.author.bot) {
  //       if (message.member.hasPermission('ADMINISTRATOR')) {
  //         if (message.content === '*setupRoles') {
            
  //           const embed = new Discord.MessageEmbed()
  //             .setTitle(`Rôles`)
  //             .setColor("#1E90FF")
  //             .addField("Configuration", `Ecrivez maintenant *updateRole suivi des arguments ci-dessous dans l'ordre.`)
  //             .addField("Id du message", `Copiez collez l'identifiant de mon message`)
  //             .addField("Nom du message", `Entrez le titre du message`)
  //             .addField("Description", `Entrez la description du message`)

  //           message.channel.send(embed);
  //           console.log(embed);
  //         } else if (message.content.startsWith('*updateRole')) {
  //           // const roles = updateRole(message.guild.id);
  //           const message_name = 'test'
  //           const roles = createRoles(message.guild.id, message.id, message_name);
  //         }
  //       }
  //     }
  //   });
  


  async function createRoles(guild_id, message_id, message_name) {
    const { roles } = client.app.models;

    const messages_roles = roles.create({
      guild_id,
      message_id,
      name: message_name
    }, (err, result) => {
      if (err) return console.log(err);
      return result;
    })
    console.log(messages_roles);
    // await roles.create([
    //   {
    //     guild_id: 'Jean-Luc Picard',
    //     age: 59, rank: 'Captain' },
    // ]);

    return result;
  }
}


  // const getEmoji = (emojiName) =>
  //   client.emojis.cache.find((emoji) => emoji.name === emojiName);

  // const rolesSchema = {
  //   'd': {

  //   }
  // }
  

  // fs.writeFileSync(path.resolve('./', 'questions.json'), JSON.stringify(question, null, 4));

  // const reactions = []

  // let emojiText = '```Réagissez aux réactions qui vous correspondent pour reçevoir le rôle associé.```\n';
  // for (const key in emojis) {
  //   const emoji = getEmoji(key)
  //   reactions.push(emoji)

  //   const role = emojis[key]
  //   emojiText += `${emoji} = ${role}\n`
  // }

  // roles_1(client, channelId, emojiText, reactions)

  // const handleReaction = (reaction, user, add) => {
  //   if (user.id === '769273143016816700') {
  //     return
  //   }

  //   const emoji = reaction._emoji.name

  //   const { guild } = reaction.message

  //   const roleName = emojis[emoji]
  //   if (!roleName) {
  //     return
  //   }

  //   const role = guild.roles.cache.find((role) => role.name === roleName)
  //   const member = guild.members.cache.find((member) => member.id === user.id)

  //   if (add) {
  //     member.roles.add(role)
  //   } else {
  //     member.roles.remove(role)
  //   }
  // }

  // client.on('messageReactionAdd', (reaction, user) => {
  //   if (reaction.message.channel.id === channelId) {
  //     handleReaction(reaction, user, true)
  //   }
  // })

  // client.on('messageReactionRemove', (reaction, user) => {
  //   if (reaction.message.channel.id === channelId) {
  //     handleReaction(reaction, user, false)
  //   }
  // })

const addRoles = async (message) => {
  await mongo().then(async (mongoose) => {

    try {
      const roles = loadRoles();
      const guildData = roles.find(r => r.channelId);

      if (guildData) {
        console.log(guildData);
        console.log(roles.channelId.emojis.map(emoji => {
          console.log(emoji.id, role.id);
        }));

      }


      return console.log('data not found, creating');

      const result = await rolesSchema.findOneAndUpdate(
        {
          guildId,
          channelId,
        },
        {
          guildId,
          channelId,
          $inc: {
            emojis: {
              id: {
                emojiId
              },
              roles: {
                roleId
              }
            },
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      await profileSchema.updateOne(
        {
          guildId,
          channelId,
        },
        {
          emojis: {
            id: '',
            role: ''
          }
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      // mongoose.connection.close();
    }
  });
}