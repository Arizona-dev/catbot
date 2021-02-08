module.exports = (app) => {
  const mongoose = require('mongoose');

  const reqString = {
    type: String,
    required: true,
  }

  const profileSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    coins: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
  });

  const profiles = mongoose.model('profiles', profileSchema);
  app.models = {
    ...app.models,
    profiles
  };
}