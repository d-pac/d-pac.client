'use strict';
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:assess.collections', '[FeedbackCollection]' );
var teardown = require( '../../common/mixins/teardown' );
var ModelClass = require( '../models/FeedbackProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/feedback',

    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    },


    getFeedbackByRepresentationId: function getFeedbackByRepresentationId( representationId, phase ){
        return this.findWhere( {
            representation: representationId,
            phase: phase
        } );
    },

    fetchForRepresentation: function( model ){
        //this.fetch( { data: { filter: JSON.stringify( { representation: model.id } ) } } );
        this.url = '/representations/'+ model.id + '/feedback';
        this.fetch();
    }

} );
teardown.collection.mixin( module.exports );
