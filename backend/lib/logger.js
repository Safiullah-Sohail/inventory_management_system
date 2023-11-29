const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    'name': 'backend',
    'level': 10,
});
