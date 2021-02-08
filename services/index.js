module.exports = (app) => {
  app.logger.info('Loading services..');
  app.services = {
    guild: require('./guild')(app),
    // menu: require('./menu')(app),
    // file: require('./file')(app),
    // history: require('./history')(app),
    // profile: require('./profile')(app),
    // email: require('./email')(app),
    // search: require('./search')(app),
  };
}
