'use strict';
var debug = require( 'debug' )( 'dpac:assess.services', '[ComparisonsParser]' );
var Backbone = require( 'backbone' );
var _ = require( 'underscore' );

function representationFilter(item){
    return item.type === "representations";
}

module.exports = function ComparisonsParser(){
    debug( '#constructor' );
};
_.extend( module.exports.prototype, Backbone.Events, {
    representationsCollection: undefined,

    parse: function( raw ){
        var representations = _.filter( raw.included, representationFilter);
        this.representationsCollection.reset( representations );
        return raw.data;
    }
} );
