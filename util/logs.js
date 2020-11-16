const fs = require('fs');
const { time } = require('./time.js');
const { LOGS } = require('../config');

const logs = (msg) => {

    if (!fs.existsSync(LOGS)) {
        fs.mkdirSync(LOGS);
    }
    let now = time();
        fs.appendFile('./logs/log.txt', `${now}: ${msg}\n`, function (err) {
            if (err) throw err;
          });
}

module.exports = {
    logs
}