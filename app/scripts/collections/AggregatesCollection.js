'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[AggregatesCollection]' );

module.exports = Backbone.Collection.extend( {

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );
    },

    hasActive : function(){
        return this.length > 0;
    },

    getActive : function(){
        return this.at( 0 );
    }
} );
