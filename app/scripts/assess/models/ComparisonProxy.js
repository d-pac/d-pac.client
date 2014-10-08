'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonProxy]' );
module.exports = Backbone.Model.extend( {
    changedSinceLastPatch : undefined,
    urlRoot : '/comparisons',
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

    save : _.debounce(function(attrs){
        debug('#save');
        this.set(attrs);
        Backbone.Model.prototype.save.call(this);
    }, 1000)
} );
