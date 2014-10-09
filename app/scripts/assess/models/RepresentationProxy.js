'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[RepresentationProxy]' );
module.exports = Backbone.NestedModel.extend( {
    idAttribute : "_id",

    config : undefined,

    defaults    : {
        assessee   : undefined,
        assessment : undefined,
        ext : undefined,
        mimeType: undefined,
        url : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id );
        Backbone.Select.Me.applyTo( this );
    }
} );
