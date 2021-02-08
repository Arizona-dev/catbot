const res = require('../middlewares/res');

module.exports = async (app) => {
  app.logger.info('[MongoDB] Connecting to database..');
  const mongoose = require('mongoose');
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  return mongoose.connect(process.env.DB)
  .then((db) => {
    app.logger.info('[MongoDB] Connected to the database..');
    return db;
  })
  .catch((err) => {
    app.logger.error('[MongoDB] Connection error: ', err);
    res.error({
      code: '500',
      type: 'database001',
      message: 'Connection error',
      err
    })
  });
};
