'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonProxy]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        assessment          : undefined,
        assessor            : undefined,
        phase               : undefined,
        comparativeFeedback : undefined,
        selected            : undefined //Representation.id
    },

    initialize : function(){
        debug( '#initialize', this.id );
    },

    update : function(attrs){
        debug('#update');

        this.save(attrs, {
            patch : true
        });
    }
} );
