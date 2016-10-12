'use strict';
const debug = require( 'debug' )( 'dpac:assess.services', '[ComparisonsParser]' );
const {Events} = require( 'backbone' );
const {extend, groupBy} = require( 'lodash' );

module.exports = function ComparisonsParser(){
    debug( '#constructor' );
};
extend( module.exports.prototype, Events, {
    representationsCollection: undefined,
    notesCollection: undefined,
    feedbackCollection: undefined,

    parseCollection: function( raw ){
        debug( '#parseCollection', raw );
        if( raw.included ){
            const grouped = groupBy( raw.included, 'type' );
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
