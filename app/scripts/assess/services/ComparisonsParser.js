'use strict';
var debug = require( 'debug' )( 'dpac:assess.services', '[ComparisonsParser]' );
var Backbone = require( 'backbone' );
var _ = require( 'underscore' );

function representationFilter( item ){
    return item.type === "representations";
}

module.exports = function ComparisonsParser(){
    debug( '#constructor' );
};
_.extend( module.exports.prototype, Backbone.Events, {
    representationsCollection: undefined,

    parseCollection: function( raw ){
        debug( '#parseCollection', raw );
        var representations = _.filter( raw.included, representationFilter );
        this.representationsCollection.reset( representations );
        return raw.data;
    },
    parseModel: function( raw ){
        debug( '#parseModel', raw );
        switch( raw.type ){
            case "messages":
                return {
                    messages: raw.messages
                };
            case "comparisons":
                return raw;
            default:
                var representations = _.filter( raw.included, representationFilter );
                this.representationsCollection.reset( representations );
                return raw.data;
        }
    }
} );
