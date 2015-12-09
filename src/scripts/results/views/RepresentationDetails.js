'use strict';
var Marionette = require( 'backbone.marionette' );

var debug = require( 'debug' )( 'dpac:results.views', '[RepresentationDetails]' );
var tpl = require( './templates/RepresentationDetails.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    initialize: function(){
        debug( '#initialize' );
    },

    serializeData: function(){
        return this.collection.selected.toJSON();
    }
} );
