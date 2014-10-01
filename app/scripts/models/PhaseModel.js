'use strict';

var debug = require( 'debug' )( 'dpac:models', '[PhaseModel]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        value : undefined,
        label : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id );
        Backbone.Select.Me.applyTo( this );
    },

    start : function(){

    },
    stop  : function(){

    }
} );
