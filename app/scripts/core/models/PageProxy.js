'use strict';
var debug = require( 'debug' )( 'dpac:core.models', '[PageProxy]' );
module.exports = Backbone.NestedModel.extend( {
    idAttribute : "slug",
    defaults    : {
        slug: "",
        title: "",
        body: ""
    },

    initialize : function(){
        debug( '#initialize', this.id );
    }
} );
