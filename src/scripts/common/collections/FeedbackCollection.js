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

    getFeedbackByDocId: function getFeedbackByDocId( docId ){
        return this.findWhere( {
            document: docId
        } );
    },
} );
teardown.collection.mixin( module.exports );
