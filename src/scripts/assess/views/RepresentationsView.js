'use strict';
const {LayoutView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationsView]' );
const tpl = require( './templates/RepresentationsView.hbs' );
const NoteView = require( './NoteView' );

module.exports = LayoutView.extend( {
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
    //    const data = {};
    //    const order = this.model.getSelectedRepresentationOrder();
    //    console.log('selectedRepresentationOrder', order);
    //    if(order){
    //        data["selected"+ order.toUpperCase()] = true;
    //    }
    //    return data;
    //},

    serializeData: function(raw){
        return {
            a: this.model.getRepresentationByOrder( "a" ).toJSON(),
            b: this.model.getRepresentationByOrder( "b" ).toJSON()
        }
    },

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
        const order = this.model.getSelectedRepresentationOrder();
        console.log('Selected order:', order);
        if( order && this.model.getAssessment().get('enableSelectionIcon')){
            this.$( this.ui[ "selected" + order.toUpperCase() ] ).removeClass( 'hidden' );
        }
    }
} );
