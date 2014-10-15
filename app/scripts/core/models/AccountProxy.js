'use strict';
var debug = require( 'debug' )( 'dpac:core.models', '[AccountProxy]' );
module.exports = Backbone.NestedModel.extend( {
    idAttribute : "_id",
    url : '/me/account',
    defaults : {
        name             : {
            first : undefined,
            last  : undefined
        },
        email            : undefined,
        password         : undefined,
        password_confirm : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id );
    }
} );