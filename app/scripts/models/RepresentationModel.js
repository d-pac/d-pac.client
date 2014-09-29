'use strict';

var debug = require( 'debug' )( 'dpac:models', '[RepresentationModel]' );
module.exports = Backbone.Model.extend( {
    defaults : {
        url      : "",
        note     : "",
        passfail : ""
    },

    initialize : function(){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    }
} );
