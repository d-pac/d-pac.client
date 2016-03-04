'use strict';
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:assess.collections', '[ComparisonsCollection]' );
var ModelClass = require( '../models/ComparisonProxy' );
var teardown = require( '../../common/mixins/teardown' );

module.exports = Backbone.Collection.extend( {

    parser: undefined,

    url: '/user/comparisons',
    model: ModelClass,
    contextEvents: {
        'assess:teardown:requested': "teardown"
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
        if(model){
            this.remove( model );
            model.teardown();
        }
    }

} );
teardown.collection.mixin( module.exports );
