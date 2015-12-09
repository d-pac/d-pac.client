'use strict';
var NestedModel = require( 'backbone-nested-model' );
var debug = require( 'debug' )( 'dpac:core.models', '[AccountProxy]' );
module.exports = NestedModel.extend( {
    idAttribute: "_id",
    url: '/user',
    defaults: {
        name: {
            first: undefined,
            last: undefined
        },
        email: undefined,
        password: undefined,
        password_confirm: undefined
    },

    initialize: function(){
        debug( '#initialize', this.id );
    },

    patch: function( attrs ){
        this.save( attrs, { patch: true } );
    }
} );