'use strict';

var debug = require( 'bows' )( 'dpac:commands' );

function SetupI18N(){
}

_.extend( SetupI18N.prototype, {
    execute : function execute(){
        debug('SetupI18N#execute');
        $.i18n.init( {
            lng : "nl-BE",
            ns  : {
                namespaces : [
                    'common',
                    'account',
                    'login'
                ],
                defaultNs  : 'common'
            }
        }, function( t ){
            this.context.dispatch( 'SetupI18N:execution:completed' );
        }.bind( this ) );
    }
} );

module.exports = SetupI18N;
