'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationsView]' );
var tpl = require( './templates/RepresentationsView.hbs' );
var NoteView = require( './NoteView' );

module.exports = Marionette.LayoutView.extend( {
    createRepresentationDetail : undefined,

    template: tpl,

    regions: {
        representationA: "#representation-A",
        representationB: "#representation-B",
        noteA: '#note-A',
        noteB: '#note-B'
    },

    ui: {
        selectedA: '#selected-A',
        selectedB: '#selected-B'
    },

    modelEvents: {
        'change:representation': 'showSelected'
    },

    initialize: function(){
        debug( "#initialize" );
    },

    //serializeData: function(raw){
    //    var data = {};
    //    var order = this.model.getSelectedRepresentationOrder();
    //    console.log('selectedRepresentationOrder', order);
    //    if(order){
    //        data["selected"+ order.toUpperCase()] = true;
    //    }
    //    return data;
    //},

    onRender: function(){
        debug( '#onRender', this.model );
        this.representationA.show( this.createRepresentationDetail( {
            model: this.model.getRepresentationByOrder( "a" )
        } ) );
        this.representationB.show( this.createRepresentationDetail( {
            model: this.model.getRepresentationByOrder( "b" )
        } ) );
        if(this.model.notesEnabled()){
            this.noteA.show( new NoteView( {
                model: this.model.getNoteByOrder( 'a' ),
                factory: this.model,
                order: 'a'
            } ) );
            this.noteB.show( new NoteView( {
                model: this.model.getNoteByOrder( 'b' ),
                factory: this.model,
                order: 'b'
            } ) );
        }
        this.showSelected();
    },

    showSelected: function(){
        var order = this.model.getSelectedRepresentationOrder();
        if( order ){
            this.$( this.ui[ "selected" + order.toUpperCase() ] ).removeClass( 'hidden' );
        }
    }
} );
