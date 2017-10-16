'use strict';
const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:core.controllers', '[ConfigureApplication]' );

module.exports = function ConfigureApplication(){
    //constructor
};

extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        let appVersionLabel = process.env.APP_VERSION_LABEL || process.env.APP_VERSION;

        const config = {
            "api": {
                "host": process.env.API_URL,
                "root": process.env.API_URL + "/api",
                "admin": process.env.API_URL + "/keystone"
            },
            "timelogs": {
                "interval": 10000,
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
            "ui": {
                "admin": process.env.DPAC_ADMIN_COLOR || ""
            }
        };
        this.context.wireValue( 'config', config );
        this.context.vent.trigger( 'config:load:completed' );
    }
} );

