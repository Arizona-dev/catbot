module.exports = (app) => {
  app.logger = require('./logger')(app);
  app.logger.info('Booting application..');

  app.boot = async function boot(port, host) {
    app.logger.info('------------------------------');

    app.db = await require('./database')(app);
    
    app.logger.info(`Running in ${process.env.NODE_ENV} mode`);
    app.logger.info(`Api listening on http://${host}:${port}`);
  };
};
