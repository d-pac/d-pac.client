'use strict';
var _ = require( 'lodash' );
var d3Tip = require( 'd3-tip' );
//var d3Legend = require( 'd3-legend' );
var stockplot = require( 'd3-stock-plot' );
var Marionette = require( 'backbone.marionette' );
var $ = require( 'jquery' );

var debug = require( 'debug' )( 'dpac:results.views', '[RepresentationsRanking]' );
var tpl = require( './templates/RepresentationsRanking.hbs' );
var tipTpl = require( './templates/RepresentationTip.hbs' );

var tip = d3Tip()
    .attr( 'class', 'd3-tip' )
    .offset( [ -10, 0 ] )
    .html( tipTpl );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    className: "column col-sm-12",

    ui: {
        spinner: '.spinner'
    },

    modelEvents: {
        'sync': 'render'
    },

    initialize: function(){
        debug( '#initialize' );
        $( window ).on( "resize", this.render );
    },

    renderGraph: _.debounce( function(){
        debug( 'renderGraph' );
        const data = this.model.toJSON();
        var n = data.representations.length;
        if( this.ui.spinner && !_.isString( this.ui.spinner ) ){
            this.ui.spinner.addClass( 'hidden' );
        }
        const graph = this.graph = stockplot();
        const values = graph.render( {
            el: this.el,
            data: data.representations,
            debug: false,
            point: {
                radius: 4,
                ratio: 2
            }
        } ).values;
        values.call( tip );
        values.on( 'mouseover.ranking', tip.show );
        values.on( 'mouseout.ranking', tip.hide );

        graph.dispatch.on( 'select.ranking', ( d )=>{
            this.model.selectRepresentation( d.id );
        } );
        const selectedId = this.model.getSelectedRepresentationId();
        if(selectedId){
            graph.select(selectedId)
        }
    }, 1000 ),

    onRender: function(){
        debug( '#onRender' );
        if( this.model.getLength() ){
            this.renderGraph();
        }
    },

    onBeforeDestroy: function(){
        this.graph.dispatch.on( 'select.ranking', null ); //removes listener
        $( window ).off( "resize" );
    }
} );
