'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[SeqsCollection]' );

var ModelClass = require( '../models/SeqProxy' );

module.exports = Backbone.Collection.extend( {

    url : '/seqs',
    model : ModelClass,

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );
    },

    selectByFind : function( attrs ){
        var model =  this.findWhere( attrs );
        if(!model){
            model = this.add(attrs);
        }
        this.select(model);
        return model;
    }
} );
