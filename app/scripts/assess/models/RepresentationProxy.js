'use strict';
var NestedModel = require( 'backbone-nested-model' );
var debug = require( 'debug' )( 'dpac:assess.models', '[RepresentationProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = NestedModel.extend( {
    idAttribute: "_id",

    defaults: {
        name: undefined,
        assessment: undefined,
        document: {
            ext: undefined,
            mimeType: undefined,
            href: undefined
        },
        selected: false
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
    },

    select: function(){
        this.set( 'selected', true );
    },

    deselect: function(){
        this.set( 'selected', false );
    }
} );
teardown.model.mixin( module.exports );

