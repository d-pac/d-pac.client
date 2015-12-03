'use strict';
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:common.collections', '[RepresentationsCollection]' );
var teardown = require( '../../common/mixins/teardown' );
var ModelClass = require( '../models/RepresentationProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/representations',
    synced: false,
    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    },

    fetchForAssessment: function( model ){
        this.fetch( { data: { filter: JSON.stringify( { assessment: model.id } ) } } );
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
