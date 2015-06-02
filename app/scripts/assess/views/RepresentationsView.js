'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationsView]' );
var tpl = require( './templates/RepresentationsView.hbs' );
var DetailView = require( './RepresentationDetailView' );

module.exports = Marionette.LayoutView.extend( {
    template: tpl,

    regions: {
        representationA: "#representation-A",
        representationB: "#representation-B"
    },

    ui: {
        selectedA: '#selected-A',
        selectedB: '#selected-B'
    },

    modelEvents: {
        'change:selectedRepresentation': 'showSelected'
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
        this.representationA.show( new DetailView( {
            model: this.model.getRepresentationByOrder( "a" )
        } ) );
        this.representationB.show( new DetailView( {
            model: this.model.getRepresentationByOrder( "b" )
        } ) );
    },

    showSelected: function(){
        var order = this.model.getSelectedRepresentationOrder();
        if( order ){
            this.$( this.ui[ "selected" + order.toUpperCase() ] ).removeClass( 'hidden' );
        }
    }
} );
