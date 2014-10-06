'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[PhaseProxy]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        type : undefined,
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
