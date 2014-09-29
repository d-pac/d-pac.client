'use strict';

var debug = require( 'debug' )( 'dpac:models', '[PhaseModel]' );
module.exports = Backbone.Model.extend( {
    defaults : {
        value : "",
        label : ""
    },

    initialize : function(){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    },

    start : function(){

    },
    stop  : function(){

    }
} );
