const mongo = require('../../mongo');

module.exports = (client) => {
  const { profiles } = client.app.models;
  client.on('message', (message) => {
    const { guild, member } = message;
    if (member && member.user && member.user.bot) {
      return
    }
    if (member && member.user) {
      addXP(guild.id, member.id, Math.random() * 3, message, profiles);
    } else {
      return
    }
  })
}

const getNeededXP = (level) => level * level * 100;

const addXP = async (guildId, userId, xpToAdd, message, profiles) => {
  await mongo().then(async (mongoose) => {
    try {
      const result = await profiles.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            xp: xpToAdd,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      let { xp, level } = result;
      const needed = getNeededXP(level);

      if (xp >= needed) {
        ++level;
        xp -= needed;

        message.reply(
          `Vous avez atteint le niveau ${level} ! Il vous manque ${getNeededXP(level)} XP avant le prochain niveau.`
        );

        await profiles.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        )
      }
    } catch (err) {
      console.log(err);
    } finally {
      mongoose.connection.close();
    }
  });
}

module.exports.addXP = addXP;