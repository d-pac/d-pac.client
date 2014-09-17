'use strict';

var debug = require( 'bows' )( 'dpac:controllers' );

module.exports = function SetupI18N( context ){
    debug( 'SetupI18N#execute' );
    $.i18n.init( {
        lng         : "nl-BE",
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
