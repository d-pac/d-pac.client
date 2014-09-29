'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[SeqsCollection]' );

var ModelClass = require( '../models/SeqModel' );

module.exports = Backbone.Collection.extend( {

    model : ModelClass,

    initialize : function(){
        debug( '#initialize' );
    }
} );
