'use strict';

var Handlebars = require( "hbsfy/runtime" );

var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupHBSHelpers]' );
var i18n = require( 'i18next' );

module.exports = function SetupHBSHelpers(){
    debug( '#execute' );

    function translate( i18n_key,
                        options ){
        var context = options.data.root;
        var opts = (context)
            ? i18n.functions.extend( options.hash, context )
            : options.hash;
        if( options.fn ){
            opts.defaultValue = options.fn( context );
        }

        var result = i18n.t( i18n_key, opts );
        return new Handlebars.SafeString( result );
    }

    Handlebars.registerHelper( 't', translate );
};
