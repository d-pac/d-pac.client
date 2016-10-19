'use strict';
const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:core', '[RemoveHangingModal]' );
const $= require('jquery');

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
