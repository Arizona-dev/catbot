module.exports = (app) => {
 const mongoose = require('mongoose');

  const reqString = {
    type: String,
    required: true,
  }

  const rolesSchema = mongoose.Schema({
    guild_id: reqString,
    message_id: reqString,
    title: {
      type: String
    },
    emojis: [{
      emoji_id: {
        type: String,
      },
      role_id: {
        type: String,
      }
    }]
  });

  const roles = mongoose.model('roles', rolesSchema);
  app.models = {
    ...app.models,
    roles
  };
}