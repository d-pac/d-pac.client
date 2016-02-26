'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[ConfigureApplication]' );

module.exports = function ConfigureApplication(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var appVersionLabel = (process.env.APP_VERSION)
            ? 'v' + process.env.APP_VERSION
            : '[BROKEN]';
        if( process.env.APP_VERSION_LABEL && process.env.APP_VERSION_LABEL !== appVersionLabel ){
            appVersionLabel += '-' + process.env.APP_VERSION_LABEL;
        }

        var config = {
            "api": {
                "host": process.env.API_HOST,
                "root": process.env.API_HOST + "api"
            },
            "timelogs": {
                "interval": 5000,
                "shortcut": "ctrl+alt+s"
            },
            "errorlogs": {
                "shortcut": "ctrl+alt+d"
            },
            "app": {
                "version": appVersionLabel,
                "lang": process.env.APP_LANG || 'nl'
            },
            "slugs": {
                "welcome": "tool-welcome"
            }
        }
        this.context.wireValue( 'config', config );
        this.context.vent.trigger( 'config:load:completed' );
    }
} );

