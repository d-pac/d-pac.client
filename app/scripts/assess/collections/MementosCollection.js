'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[MementosCollection]' );

var ModelClass = require( '../models/MementoProxy' );

module.exports = Backbone.Collection.extend( {

    url : '/me/mementos',
    model : ModelClass,

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
