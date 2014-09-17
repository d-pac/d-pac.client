'use strict';

var debug = require( 'debug' )( 'dpac:controllers', '[SetupI18N]' );

module.exports = function SetupI18N( context ){
    debug( '#execute' );

    $.i18n.init( {
        lng         : "nl",
        fallbackLng : false,
        ns          : {
            namespaces : [
                'common',
                'account',
                'login',
                'welcome',
                'assessment',
                "errors"
            ],
            defaultNs  : 'common'
        }
    }, function( t ){
        context.dispatch( 'SetupI18N:execution:completed' );
    } );
};
