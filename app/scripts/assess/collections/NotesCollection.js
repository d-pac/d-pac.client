'use strict';
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:assess.collections', '[NotesCollection]' );
var teardown = require( '../../common/mixins/teardown' );
var ModelClass = require( '../models/NoteProxy' );

module.exports = Backbone.Collection.extend( {
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
