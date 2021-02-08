const roles_1 = require('./Messages/roles_1');
const fs = require('fs');
const path = require('path');
const rolesData = require('../../roles.json');
const mongo = require('../../mongo');

module.exports = (client) => {
  const { roles } = client.app.models;
  // const channelId = '796844120768774154'
  // Setting data from website
  // const guildId = message.guild.id;
  // const channelId = '807217203367510016';

  let guildId = '753700110864482395';
  let channelId = '808085474785755208';
  let messageId;

  client.on('message', async (message) => {
      if (!message.author.bot) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
          if (message.content === '*setupRoles') {
            addRoles(message.guild.id, channelId);
          }
        }
      }
    })
  }
  // const getEmoji = (emojiName) =>
  //   client.emojis.cache.find((emoji) => emoji.name === emojiName);

  // const rolesSchema = {
  //   'd': {

  //   }
  // }
  loadRoles();
  function loadRoles() {
    const rolesList = JSON.parse(fs.readFileSync(path.resolve('./', 'roles.json')));
    return rolesList;
  }

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

const addRoles = async (guildId, channelId) => {
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