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
            grouped.representations && this.representationsCollection.reset( grouped.representations ); //eslint-disable-line no-unused-expressions
            grouped.notes && this.notesCollection.reset( grouped.notes );//eslint-disable-line no-unused-expressions
            grouped.feedback && this.feedbackCollection.reset( grouped.feedback );//eslint-disable-line no-unused-expressions
        }
        return raw.data;
    },

    /**
     *
     * @param {{}} mixed - can be enveloped with `data` when called as a result of PATCH, or could be plain object when called from collection
     * @returns {*} a model or array of models
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
