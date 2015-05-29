'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[MinsizeWarning]' );
var tpl = require( './templates/MinsizeWarning.hbs' );
var Marionette = require( 'backbone.marionette' );
module.exports = Marionette.ItemView.extend( {
    el: '#size-warning',
    template: tpl,
    initialize: function(){
        debug( "#initialize" );
    }
} );
