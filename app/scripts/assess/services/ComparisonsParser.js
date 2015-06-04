'use strict';
var debug = require( 'debug' )( 'dpac:assess.services', '[ComparisonsParser]' );
var Backbone = require( 'backbone' );
var _ = require( 'underscore' );

function representationFilter( item ){
    return item.type === "representations";
}

function notesFilter( item ){
    return item.type === "notes";
}

module.exports = function ComparisonsParser(){
    debug( '#constructor' );
};
_.extend( module.exports.prototype, Backbone.Events, {
    representationsCollection: undefined,
    notesCollection:undefined,

    parseCollection: function( raw ){
        debug( '#parseCollection', raw );
        this.representationsCollection.reset(  _.filter( raw.included, representationFilter ) );
        this.notesCollection.reset(  _.filter( raw.included, notesFilter ) );
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
                return this.parseCollection(raw);
        }
    }
} );
