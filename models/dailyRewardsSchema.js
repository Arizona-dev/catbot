module.exports = (app) => {
  const mongoose = require('mongoose');

  const reqString = {
    type: String,
    required: true,
  }

  const dailyRewardsSchema = mongoose.Schema(
    {
      guildId: reqString,
      userId: reqString,
    },
    {
      timestamps: true,
    }
  )
  const dailyRewards = mongoose.model('dailyRewards', dailyRewardsSchema);
  app.models = {
    ...app.models,
    dailyRewards
  };
}