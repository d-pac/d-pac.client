'use strict';
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:common.collections', '[RepresentationsCollection]' );
var teardown = require( '../../common/mixins/teardown' );
var selectable = require( '../../common/mixins/selectable' );
var ModelClass = require( '../models/RepresentationProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/representations',
    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    },

    fetchForAssessment: function( model ){
        this.fetch( { data: { filter: JSON.stringify( { assessment: model.id } ) } } );
    }

} );
teardown.collection.mixin( module.exports );
selectable.collection.mixin( module.exports );
