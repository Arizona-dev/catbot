module.exports = (app) => {
  const mongoose = require('mongoose');

  const messageCountSchema = mongoose.Schema({
    // The user ID
    _id: {
      type: String,
      required: true,
    },

    // How many messages they have sent
    messageCount: {
      type: Number,
      required: true,
    },
  })

  const messageCounts = mongoose.model('messageCounts', messageCountSchema);
  app.models = {
    ...app.models,
    messageCounts
  };
}