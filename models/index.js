module.exports = (app) => {
  app.logger.info('Loading models..');
  require('./dailyRewardsSchema.js')(app);
  require('./messageCountSchema.js')(app);
  require('./profileSchema.js')(app);
  require('./rolesSchema.js')(app);
  require('./verificationChannelsSchema.js')(app);
  require('./welcomeSchema.js')(app);
  require('./wouldYouRatherSchema.js')(app);
}