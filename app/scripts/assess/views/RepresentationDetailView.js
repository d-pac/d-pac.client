'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var tpl = require('./templates/RepresentationDetail.hbs');

module.exports = Marionette.ItemView.extend( {

    className: "row",
    template: tpl,

    initialize: function( opts ){
        debug( "#initialize" );
    }
} );
