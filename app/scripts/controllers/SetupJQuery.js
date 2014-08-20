'use strict';
var debug = require( 'bows' )( 'dpac:commands' );
module.exports = function SetupJQuery(){
    debug( 'SetupJQuery#constructor' );
    $.ajaxPrefilter( function( options,
                               originalOptions,
                               jqXHR ){
        options.xhrFields = {
            withCredentials : true
        };
    } );
};
