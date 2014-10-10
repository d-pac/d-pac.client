'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[SeqsCollection]' );
var teardown = require('../mixins/teardown');
var ModelClass = require( '../models/SeqProxy' );

module.exports = Backbone.Collection.extend( {

    url : '/seqs',
    model : ModelClass,

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );
        teardown.collection.mixin(this);
        this.once('teardown:pre', function(){
            this.deselect();
        }, this);
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
