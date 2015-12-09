'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[LoadConfiguration]' );
var konfy = require( 'konfy' );

module.exports = function LoadConfiguration(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
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
                "version": process.env.APP_VERSION,
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
        //debug( 'requesting config with data:', {
        //    API_HOST: process.env.API_HOST,
        //    APP_VERSION: process.env.APP_VERSION,
        //    APP_LANG: process.env.APP_LANG || 'nl'
        //} );
        //konfy.load( {
        //    configFile: "scripts/core/config.json",
        //    config: {
        //        API_HOST: process.env.API_HOST,
        //        APP_VERSION: process.env.APP_VERSION,
        //        APP_LANG: process.env.APP_LANG || 'nl'
        //    }
        //}, function( err,
        //             config ){
        //    debug( 'received config:', config );
        //    this.context.wireValue( 'config', config );
        //    this.context.vent.trigger( 'config:load:completed' );
        //}.bind( this ) );
    }
} );

