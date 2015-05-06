'use strict';

var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupI18N]' );
var i18n = require( 'i18next' );

module.exports = function SetupI18N( context ){
    debug( '#execute' );

    i18n.init( {
        lng         : "nl",
        fallbackLng : false,
        ns          : {
            namespaces : [
                'common',
                'account',
                'login',
                'assessment',
                "errors",
                "tutorial"
            ],
            defaultNs  : 'common'
        }
    }, function( t ){
        context.dispatch( 'SetupI18N:execution:completed' );
    } );
};
