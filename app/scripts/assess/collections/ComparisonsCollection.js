'use strict';
var Backbone = require( 'backbone' );
var Select = require( 'backbone.select' );

var debug = require( 'debug' )( 'dpac:assess.collections', '[ComparisonsCollection]' );
var ModelClass = require( '../models/ComparisonProxy' );
var teardown = require( '../mixins/teardown' );

module.exports = Backbone.Collection.extend( {

    url: '/user/comparisons',
    model         : ModelClass,
    contextEvents: {
        'assessment:teardown:requested': "teardown"
    },

    initialize: function( models ){
        debug( '#initialize' );
        Select.One.applyTo( this, models );
        this.on( 'deselect:one', this.teardownModel, this );
    },

    parse: function( response ){
        return response.data;
    },

    hasActive: function(){
        var found = this.findWhere( {
            completed: false
        } );
        return !!found;
    },

    getActive: function(){
        return this.findWhere( {
            completed: false
        } );
    },

    teardownModel: function( model ){
        debug.debug( '#teardownModel' );
        this.remove( model );
        model.teardown();
    },

    onTeardown: function(){
        debug( "#teardown" );
        this.deselect( this.selected, { silent: true } );
    }
} );
teardown.collection.mixin( module.exports );
