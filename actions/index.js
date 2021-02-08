module.exports = (app) => {
  //* Importing all the actions
  app.logger.info('Loading actions..');

  app.action = {
    guild: require('./guild')(app)
  }
}