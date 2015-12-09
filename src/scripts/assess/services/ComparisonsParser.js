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
        if(raw.included){
            this.representationsCollection.reset(  _.filter( raw.included, representationFilter ) );
            this.notesCollection.reset(  _.filter( raw.included, notesFilter ) );
        }
        return raw.data;
    },

    /**
     *
     * @param mixed can be enveloped with `data` when called as a result of PATCH, or could be plain object when called from collection
     * @returns {*}
     */
    parseModel: function( mixed ){
        debug( '#parseModel', mixed );
        switch( mixed.type ){
            case "messages":
                return {
                    messages: mixed.messages
                };
            case "comparisons":
                return mixed;
            default: // enveloped
                return this.parseCollection(mixed);
        }
    }
} );
