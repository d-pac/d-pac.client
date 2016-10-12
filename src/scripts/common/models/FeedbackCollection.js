'use strict';
const {Collection} = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:common.collections', '[FeedbackCollection]' );
const teardown = require( '../../common/mixins/teardown' );
const ModelClass = require( '../models/FeedbackProxy' );

module.exports = Collection.extend( {
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
