const express = require('express');
module.exports = (app) => {
  app.logger.info('Loading routes..');
  app.use(app.middlewares.bodyParser.json());
  app.use(app.middlewares.bodyParser.urlencoded({ limit: '2mb', extended: true }));


  //* Importing all the routes
  app.use('/guild', require('./guild')(app));
}