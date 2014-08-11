'use strict';

function SetupI18N(){
}

_.extend( SetupI18N.prototype, {
    execute : function execute(){
        $.i18n.init( {
            lng : "nl-BE",
            ns  : {
                namespaces : ['common'],
                defaultNs  : 'common'
            }
        }, function( t ){
            this.context.dispatch( 'SetupI18N:execution:completed' );
        }.bind( this ) );
    }
} );

module.exports = SetupI18N;
