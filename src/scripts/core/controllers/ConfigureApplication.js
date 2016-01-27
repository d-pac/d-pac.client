'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[ConfigureApplication]' );

module.exports = function ConfigureApplication(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var appVersionLabel = process.env.APP_VERSION || '[BROKEN]';
        if(process.env.APP_VERSION_LABEL){
            appVersionLabel+= '-' + process.env.APP_VERSION_LABEL;
        }
        this.context.wireValue( 'config', {
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
            },
            "flags": {
                "hide_tutorial": process.env.HIDE_TUTORIAL || false
            }
        } );
        this.context.vent.trigger( 'config:load:completed' );
    }
} );

