'use strict';
var Backbone = require('backbone');
var Select = require('backbone.select');
var debug = require( 'debug' )( 'dpac:assess.models', '[RepresentationProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = Backbone.NestedModel.extend( {
    idAttribute : "_id",

    defaults : {
        name       : undefined,
        createdBy  : undefined,
        assessment : undefined,
        document   : {
            ext      : undefined,
            mimeType : undefined,
            href     : undefined
        }
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Select.Me.applyTo( this );
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.deselect( { silent : true } );
    }
} );
teardown.model.mixin( module.exports );

