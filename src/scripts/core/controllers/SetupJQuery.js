'use strict';

const {extend} = require( 'lodash' );
const debug = require( 'debug' )( 'dpac:core.controllers', '[SetupJQuery]' );
const $ = require( 'jquery' );

module.exports = function SetupJQuery(){
    //constructor
};


extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        //copied from http://stackoverflow.com/questions/8897289/how-to-check-if-an-element-is-off-screen
        $.expr.filters.offscreen = function(el) {
          const rect = el.getBoundingClientRect();
          return (
                   (rect.x + rect.width) < 0
                     || (rect.y + rect.height) < 0
                     || (rect.x > window.innerWidth || rect.y > window.innerHeight)
                 );
        };    }
} );
