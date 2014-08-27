'use strict';
var debug = require( 'bows' )( 'dpac:commands' );

var <%= file.name %> = module.exports = function <%= file.name %>(){
};
_.extend( <%= file.name %>.prototype, {
    execute : function(){
        debug.log( '<%= file.name %>#execute' );
    }
} );
