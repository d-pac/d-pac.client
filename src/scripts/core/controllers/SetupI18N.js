'use strict';

const {extend} = require( 'lodash' );
const debug = require( 'debug' )( 'dpac:core.controllers', '[SetupI18N]' );
const i18n = require( 'i18next' );

module.exports = function SetupI18N(){
    //constructor
};

extend( module.exports.prototype, {
    wiring: [ 'config', 'appContext' ],
    execute: function(){
        debug( '#execute' );
        const context = this.appContext;

        i18n.init( {
            lng: this.config.app.lang,
            fallbackLng: false,
            ns: {
                namespaces: [
                    'common',
                    'account',
                    'login',
                    'assess',
                    'results',
                    "errors",
                    "tutorial",
                    "uploads"
                ],
                defaultNs: 'common'
            }
        }, function( t ){
            context.dispatch( 'SetupI18N:execution:completed' );
        } );
    }
} );
