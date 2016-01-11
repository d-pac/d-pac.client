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


    getFeedbackByDocId: function getFeedbackByDocId( docId ){
        return this.findWhere( {
            document: docId
        } );
    },

    fetchForRepresentation: function( model ){
        //this.fetch( { data: { filter: JSON.stringify( { representation: model.id } ) } } );
        this.url = '/representations/'+ model.id + '/feedback';
        this.fetch();
    },

    fetch: function( opts ){
        this.synced = false;
        this.once( 'sync', function(){
            this.synced = true;
        }, this );
        Backbone.Collection.prototype.fetch.call( this, opts );
    }

} );
teardown.collection.mixin( module.exports );
