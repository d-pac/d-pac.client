'use strict';
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:assess.collections', '[PhasesCollection]' );
var teardown = require( '../../common/mixins/teardown' );
var ModelClass = require( '../models/PhaseProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/phases',
    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( response ){
        return response.data;
    }
} );
teardown.collection.mixin( module.exports );
