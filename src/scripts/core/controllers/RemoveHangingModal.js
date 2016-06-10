'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core', '[RemoveHangingModal]' );
var $= require('jquery');

module.exports = function RemoveHangingModal(){
    //constructor
};
_.extend( module.exports.prototype, {
    execute : function(){
        debug( '#execute' );
        $('.modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
} );
