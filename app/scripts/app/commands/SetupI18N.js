'use strict';

module.exports = function SetupI18N(){
    $.i18n.init( {
        lng : "nl-BE",
        ns  : {
            namespaces : ['common'],
            defaultNs  : 'common'
        }
    }, function( t ){
    } );
}
