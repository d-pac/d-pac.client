'use strict';
var _ = require( 'lodash' );
var d3Tip = require( 'd3-tip' );
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

    ui: {
        spinner: '.spinner'
    },

    initialize: function(){
        debug( '#initialize' );
        if( !this.collection.synced ){
            this.collection.once( 'sync', function(){
                this.render();
            }, this );
        }

        $( window ).on( "resize", this.render );
    },

    serializeData: function(){
        return this.assessments.selected.toJSON();
    },

    onRender: function(){
        debug( '#onRender' );
        var n = this.collection.length;
        if( n && this.collection.synced ){
            this.ui.spinner.addClass( 'hidden' );
            var statsByRepresentation = this.assessments.selected.get( 'stats' ).byRepresentation;
            var graph = stockplot();
            var i = 0;

            var data = this.collection
                .sortBy( function( model ){
                    return model.get( 'ability.value' );
                } )
                .map( function( model ){
                    var ability = Number( model.get( 'ability.value' ) );
                    var rse = Number( model.get( 'ability.se' ) );
                    var se = Math.min( rse, 3 );
                    //TODO: this shouldn't happen here
                    model.set( {
                        rank: n-i,
                        comparisonsNum: _.get( statsByRepresentation, [ model.id, 'comparisonsNum' ], 0 )
                    } );
                    return {
                        comparisonsNum: model.get( 'comparisonsNum' ),
                        name: model.get( 'name' ),
                        rank: model.get( 'rank' ),
                        ability: ability,
                        rse: rse,
                        se: se,
                        x: ++i,
                        y: ability,
                        selected: false,
                        id: model.id,
                        classes: [ 'representation-' + _.kebabCase( model.get( 'rankType' ) ) ]
                    }
                } );

            var values = graph.render( {
                el: this.el,
                data: data,
                debug: false,
                point: {
                    radius: 4,
                    ratio: 2
                }
            } );
            values.call( tip );

            values.on( 'mouseover.ranking', tip.show );
            values.on( 'mouseout.ranking', tip.hide );
            values.on( 'click.ranking', function( d ){
                var model = this.collection.selectByID( d.id );
                this.dispatch( "results:representation:selected", {
                    representation: model
                } );
            }.bind( this ) )

        }
    }
} );
