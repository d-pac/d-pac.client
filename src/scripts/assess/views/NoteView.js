'use strict';

const {debounce} = require( 'lodash' );
const {ItemView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:assess.views', '[NoteView]' );
const tpl = require( './templates/Note.hbs' );

module.exports = ItemView.extend( {
    className: "well",
    template: tpl,
    ui: {
        notes: "textarea"
    },
    events: {
        "input @ui.notes": "notesChanged"
    },

    initialize: function( opts ){
        debug( "#initialize" );
    },

    serializeData: function(){
        const body = (this.model)
            ? this.model.get( 'body' )
            : '';
        return {
            order: this.options.order,
            body: body
        };
    },

    notesChanged: debounce( function(){
        const data = { body: this.$( this.ui.notes ).val() };
        if( this.model ){
            this.model.set( data );
        } else {
            this.model = this.options.factory.createNote( data, this.options.order );
        }

        console.log( this.model );
    }, 1000 )
} );
