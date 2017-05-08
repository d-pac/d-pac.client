'use strict';

if (!window.console) {
    const noop = function () {
        // noop
    };
    window.console = {
        "log": noop,
        "debug": noop,
        "info": noop,
        "warn": noop,
        "error": noop,
        "assert": noop,
        "dir": noop,
        "clear": noop
    };
}

/* stand-alones */
require('babel-polyfill');
require('modernizr');
require('bootstrap');
require('../styles/main.less');
require('lity');
/* --- */

require('./core/controllers/SetupDebugging')();

const {GA_DIM_INSTANCE} = require('./common/constants');
ga('set', GA_DIM_INSTANCE, process.env.API_URL);

const debug = require('debug')('dpac:app');
debug('*** starting up ***');

const app = require('./core/App.js');
app.start();
