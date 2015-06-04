'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var tpl = require( './templates/Note.hbs' );

module.exports = Marionette.ItemView.extend( {
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
        console.log( opts );
    },

    serializeData: function(){
        console.log( this );
        var body = (this.model)
            ? this.model.get( 'body' )
            : '';
        return {
            order: this.options.order,
            body: body
        }
    },

    notesChanged: _.debounce( function(){
        var data = { body: this.$( this.ui.notes ).val() };
        if( this.model ){
            this.model.set( data );
        } else {
            this.model = this.options.factory.createNote( data, this.options.order );
        }

        console.log( this.model );
    }, 1000 )
} );
