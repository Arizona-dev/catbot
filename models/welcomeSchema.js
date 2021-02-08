module.exports = (app) => {
  const mongoose = require('mongoose');

  const reqString = {
    type: String,
    required: true,
  }

  const welcomeSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
    text: reqString,
  });

  const welcomeChannel = mongoose.model('welcomeChannel', welcomeSchema);
  app.models = {
    ...app.models,
    welcomeChannel
  };
}