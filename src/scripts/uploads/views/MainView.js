'use strict';

const debug = require( 'debug' )( 'dpac:uploads.views', '[MainView]' );
const tpl = require( './templates/MainView.hbs' );
const {LayoutView} = require( 'backbone.marionette' );
module.exports = LayoutView.extend( {
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
