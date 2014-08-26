'use strict';

var debug = require( 'bows' )( 'dpac:commands' );

module.exports = function SetupHandlebars(){
    debug( 'SetupHandlebars#constructor' );

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

    //TODO: ugly, ugly, ugly, figure out a way how to combine both
    Handlebars.registerHelper( 't', translate );
}
