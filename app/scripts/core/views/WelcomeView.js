'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[WelcomeView]' );
var tpl = require( './templates/Welcome.hbs' );
module.exports = Marionette.ItemView.extend( {
    template : tpl,

    initialize : function(){
        debug( "#initialize" );
    }
} );
