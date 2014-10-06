'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonProxy]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        assessment : undefined,
        assessor   : undefined,
        phase      : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id );
    }
} );
