'use strict';

module.exports = function( grunt,
                           opts ){
    var webpackConfig = require( "../webpack.config.js" );
    return {
        options: webpackConfig,
        dist: {
            output: {
                path: '.tmp/scripts/',
                filename: "[name].js"
            }
        }
    }
};
