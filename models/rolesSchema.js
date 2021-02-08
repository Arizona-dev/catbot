module.exports = (app) => {
 const mongoose = require('mongoose');

  const reqString = {
    type: String,
    required: true,
  }

  const rolesSchema = mongoose.Schema({
    guildId: reqString,
    messageId: reqString,
    removable: {
      type: Boolean,
      default: true
    },
    emojis: [{
      id: {
        type: String,
      },
      role: {
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