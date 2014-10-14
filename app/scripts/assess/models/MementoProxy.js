'use strict';
var debug = require( 'debug' )( 'dpac:assess.models', '[MementoProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = Backbone.Model.extend( {
    parser : undefined,

    defaults : {
        comparison      : undefined,
        judgements      : undefined,
        phases          : undefined,
        representations : undefined,
        seqs            : undefined
    },

    initialize : function( attrs ){
        debug( '#initialize', this.id || '<new>' );
        Backbone.Select.Me.applyTo( this );
    },

    parse : function( response ){
        return this.parser.parse( response );
    },

    get : function( attr ){
        if( typeof this["_get_" + attr] == 'function' ){
            return this["_get_" + attr]();
        }

        return Backbone.Model.prototype.get.call( this, attr );
    },

    _get_completed : function(){
        return this.get( 'comparison' ).get( 'completed' );
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.deselect( { silent : true } );
        this.get( 'comparison' ).teardown();
        this.get( 'judgements' ).teardown();
        this.get( 'phases' ).teardown();
        this.get( 'representations' ).teardown();
        this.get( 'seqs' ).teardown();
        this.parser = undefined;
    }
} );
teardown.model.mixin( module.exports );
