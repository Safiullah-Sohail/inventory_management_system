'use strict';

// Define Global Keys
require('dotenv').config();
require('./global-keys');

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const kraken = require('kraken-js');
const cors = require('cors');
const morgan = require('morgan');


const customResponseMethodAppender = require('customize-response-appender')({
    reponsesConfigFilePath: 'config/responses-config.js',
});
const app = express();

/*
 * Kraken-js Configurations
 */
const options = {
    onconfig: function (config, next) {
        next(null, config);
    }
};
app.use(kraken(options));

// <<<<<---------------MIDDLEWARES------------------------>>>>>
// For custom configuration you just have to pass false as a prameter and update config file accordingly

// parse application/json
app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(cors(require(`${global.paths.config}/cors-options`)()));

app.all('*', customResponseMethodAppender);

app.use(morgan('dev'));

// <<<<<--------------------------------------->>>>> 

app.on('start', function () {
    global.kraken = app.kraken;
    global.log.info('Application ready to serve requests.');
    global.log.info('Environment: %s', app.kraken.get('env:env'));
});

module.exports = app;
