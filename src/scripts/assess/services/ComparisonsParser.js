'use strict';
var debug = require( 'debug' )( 'dpac:assess.services', '[ComparisonsParser]' );
var Backbone = require( 'backbone' );
var _ = require( 'underscore' );

module.exports = function ComparisonsParser(){
    debug( '#constructor' );
};
_.extend( module.exports.prototype, Backbone.Events, {
    representationsCollection: undefined,
    notesCollection: undefined,
    feedbackCollection: undefined,

    parseCollection: function( raw ){
        debug( '#parseCollection', raw );
        if( raw.included ){
            var grouped = _.groupBy( raw.included, 'type' );
            this.representationsCollection.reset( grouped.representations );
            this.notesCollection.reset( grouped.notes );
            this.feedbackCollection.reset( grouped.feedback );
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
                return this.parseCollection( mixed );
        }
    }
} );
