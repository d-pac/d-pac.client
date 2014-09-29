'use strict';

var debug = require( 'debug' )( 'dpac:models', '[ComparisonModel]' );
module.exports = Backbone.Model.extend( {
    defaults : {
        title       : "",
        description : "",
        feedback    : ""
    },

    initialize : function(){
        debug( '#initialize' );
    }
} );
