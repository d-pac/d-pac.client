'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[RepresentationModel]' );
module.exports = Backbone.NestedModel.extend( {
    idAttribute : "_id",
    defaults    : {
        assessee   : undefined,
        assessment : undefined,
        file       : {
            filename : undefined,
            filetype : undefined,
            path     : undefined
        }
    },

    initialize : function(){
        debug( '#initialize', this.id );
        Backbone.Select.Me.applyTo( this );
    }
} );
