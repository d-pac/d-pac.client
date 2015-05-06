'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[LoadConfiguration]' );
var konfy = require( 'konfy' );

module.exports = function BootstrapApplication(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        konfy.load( {
            configFile: "scripts/core/config.json",
            config: {
                API_HOST: process.env.API_HOST,
                APP_VERSION: process.env.APP_VERSION
            }
        }, function( err,
                     config ){
            this.context.wireValue( 'config', config );
            this.context.vent.trigger( 'config:load:completed' );
        }.bind( this ) );
    }
} );

