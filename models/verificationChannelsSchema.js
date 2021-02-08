module.exports = (app) => {
  const mongoose = require('mongoose')

  const reqString = {
    type: String,
    required: true,
  }

  const verificationChannelsSchema = mongoose.Schema({
    // Guild ID
    _id: reqString,
    channelId: reqString,
    roleId: reqString,
  });

  const verificationChannel = mongoose.model('verificationChannel', verificationChannelsSchema);
  app.models = {
    ...app.models,
    verificationChannel
  };
}