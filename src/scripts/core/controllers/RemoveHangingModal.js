'use strict';
const {extend} = require( 'lodash' );

var debug = require( 'debug' )( 'dpac:core', '[RemoveHangingModal]' );
var $= require('jquery');

module.exports = function RemoveHangingModal(){
    //constructor
};
extend( module.exports.prototype, {
    execute : function(){
        debug( '#execute' );
        $('.modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
} );
