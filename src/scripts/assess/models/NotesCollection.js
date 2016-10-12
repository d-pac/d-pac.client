'use strict';
const {Collection} = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:assess.collections', '[NotesCollection]' );
const teardown = require( '../../common/mixins/teardown' );
const ModelClass = require( '../models/NoteProxy' );

module.exports = Collection.extend( {
    url: '/notes',

    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    getNoteByDocId: function getNoteByDocId(docId){
        return this.findWhere({
            document: docId
        });
    }
} );
teardown.collection.mixin( module.exports );
