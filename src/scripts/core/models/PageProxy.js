'use strict';
const debug = require( 'debug' )( 'dpac:core.models', '[PageProxy]' );
const NestedModel = require('backbone-nested-model');

module.exports = NestedModel.extend( {
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
