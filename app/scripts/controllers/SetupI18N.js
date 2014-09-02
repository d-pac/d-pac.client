'use strict';

var debug = require( 'bows' )( 'dpac:controllers' );

function SetupI18N(){
}

_.extend( SetupI18N.prototype, {
    execute : function execute(){
        debug('SetupI18N#execute');
        $.i18n.init( {
            lng : "nl-BE",
            fallbackLng: false,
            ns  : {
                namespaces : [
                    'common',
                    'account',
                    'login',
                    'welcome',
                    'assessment'
                ],
                defaultNs  : 'common'
            }
        }, function( t ){
            this.context.dispatch( 'SetupI18N:execution:completed' );
        }.bind( this ) );
    }
} );

module.exports = SetupI18N;
