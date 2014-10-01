'use strict';
var debug = require( 'debug' )( 'dpac:core.models', '[UserModel]' );
module.exports = Backbone.NestedModel.extend( {
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
