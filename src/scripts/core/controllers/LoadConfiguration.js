'use strict';
var _ = require( 'underscore' );
var konfy = require( 'konfy' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[LoadConfiguration]' );

module.exports = function LoadConfiguration(){
    //constructor
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        debug( 'requesting config with data:', {
            API_HOST: process.env.API_HOST,
            APP_VERSION: process.env.APP_VERSION,
            APP_LANG: process.env.APP_LANG || 'nl'
        } );
        konfy.load( {
            configFile: "scripts/core/config.json",
            config: {
                API_HOST: process.env.API_HOST,
                APP_VERSION: process.env.APP_VERSION,
                APP_LANG: process.env.APP_LANG || 'nl'
            }
        }, function( err,
                     config ){
            debug( 'received config:', config );
            this.context.wireValue( 'config', config );
            this.context.vent.trigger( 'config:load:completed' );
        }.bind( this ) );
    }
} );

