'use strict';
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:assess.collections', '[RepresentationsCollection]' );
var teardown = require( '../../common/mixins/teardown' );
var ModelClass = require( '../models/RepresentationProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/representations',

    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    }
} );
teardown.collection.mixin( module.exports );
