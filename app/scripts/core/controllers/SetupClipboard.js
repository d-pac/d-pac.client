'use strict';
var ZeroClipboard = require( 'zeroclipboard' );
var debug = require( 'debug' )( 'dpac:core', '[SetupClipboard]' );

var SetupClipboard = module.exports = function SetupClipboard(){
};
_.extend( SetupClipboard.prototype, {
    execute : function(){
        debug.log( '#execute' );
        ZeroClipboard.config( { swfPath: "swf/ZeroClipboard.swf" } );
    }
} );
