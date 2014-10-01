'use strict';
var debug = require( 'debug' )( 'dpac:<%= meta.package %>', '[<%= file.name %>]' );

var <%= file.name %> = module.exports = function <%= file.name %>(){
};
_.extend( <%= file.name %>.prototype, {
    execute : function(){
        debug.log( '#execute' );
    }
} );
