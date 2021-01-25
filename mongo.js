const mongoose = require('mongoose');
const { DB } = require('./config');

module.exports = async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  return mongoose
}