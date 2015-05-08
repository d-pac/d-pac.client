'use strict';
var Backbone = require( 'backbone' );
var _ = require( 'underscore' );
var $ = require( 'jquery' );
var Select = require( 'backbone.select' );
var debug = require( 'debug' )( 'dpac:assess.collections', '[RepresentationsCollection]' );
var teardown = require( '../mixins/teardown' );
var ModelClass = require( '../models/RepresentationProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/representations',

    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
        Select.One.applyTo( this, models );
    },

    fetchSelective: function( ids,
                              opts ){
        debug( "#fetchSelective" );
        this.fetch( _.defaults( {}, opts, {
            data: $.param( { filter: ids } )
        } ) );
    },

    selectByID: function( id ){
        //debug.debug('selectByID', id);
        var model = this.get( id );
        if( model ){
            this.select( model );
        }
        return model;
    },

    getSelectedID: function(){
        if( this.selected ){
            return this.selected.id;
        }
        return undefined;
    },

    onTeardown: function(){
        debug( "#teardown" );
        this.deselect( this.selected, { silent: true } );
    }
} );
teardown.collection.mixin( module.exports );
