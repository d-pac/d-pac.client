'use strict';
var Backbone = require( 'backbone' );
var Select = require( 'backbone.select' );
var debug = require( 'debug' )( 'dpac:assess.models', '[MementoProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = Backbone.Model.extend( {
    parser: undefined,

    defaults: {
        assessor: undefined,
        assessment: undefined,
        comparison: undefined,
        phases: undefined,
        representations: undefined,
        progress: undefined
    },

    initialize: function( attrs ){
        debug( '#initialize', this.id || '<new>' );
        Select.Me.applyTo( this );
    },

    parse: function( response ){
        return this.parser.parse( response );
    },

    get: function( attr ){
        if( typeof this[ "_get_" + attr ] == 'function' ){
            return this[ "_get_" + attr ]();
        }

        return Backbone.Model.prototype.get.call( this, attr );
    },

    _get_completed: function(){
        return this.get( 'comparison' ).get( 'completed' );
    },

    _get_allCompleted: function(){
        return this.get( 'progress' ).isCompleted();
    },

    onTeardown: function(){
        debug( "#teardown" );
        this.deselect( { silent: true } );
        this.get( 'comparison' ).teardown();
        this.get( 'representations' ).teardown();
        this.parser = undefined;
    }
} );
teardown.model.mixin( module.exports );
