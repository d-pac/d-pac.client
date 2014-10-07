'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[SeqsCollection]' );

var ModelClass = require( '../models/SeqProxy' );

module.exports = Backbone.Collection.extend( {
    comparison : undefined,
    phases : undefined,

    model : ModelClass,

    initialize : function(){
        debug( '#initialize' );
    },

    create : function (attrs){
        console.log(attrs);
    }
} );
