'use strict';
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:assess.collections', '[ComparisonsCollection]' );
var ModelClass = require( '../models/ComparisonProxy' );
var teardown = require( '../mixins/teardown' );

module.exports = Backbone.Collection.extend( {

    parser: undefined,

    url: '/user/comparisons',
    model: ModelClass,
    contextEvents: {
        'assessment:teardown:requested': "teardown"
    },

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( response ){
        debug('#parse');
        return this.parser.parseCollection( response );
    },

    hasActives: function(){
        return !!this.length;
    },

    teardownModel: function( model ){
        debug.debug( '#teardownModel' );
        this.remove( model );
        model.teardown();
    }

} );
teardown.collection.mixin( module.exports );
