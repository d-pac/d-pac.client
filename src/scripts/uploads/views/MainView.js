'use strict';

var debug = require( 'debug' )( 'dpac:uploads.views', '[MainView]' );
var tpl = require( './templates/MainView.hbs' );
var Marionette = require( 'backbone.marionette' );
module.exports = Marionette.LayoutView.extend( {
    template: tpl,
    //avoid the idiotic div-wrapper
    tagName: "div",
    className: "row",

    overviewFactory: undefined,

    contextEvents: {
    },

    regions: {
        overview: "#uploads-content"
    },

    initialize: function(){
        debug( "#initialize" );
    },

    onRender: function(){
        this.dispatch( 'uploads:ui:rendered' );
        this.overview.show(this.overviewFactory());
    },

    onDestroy: function(){
        this.dispatch( 'uploads:ui:destroyed' );
    }

} );
