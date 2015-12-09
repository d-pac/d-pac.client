'use strict';
var Marionette = require( 'backbone.marionette' );

var debug = require( 'debug' )( 'dpac:results.views', '[AssessmentMenu]' );
var tpl = require( './templates/AssessmentMenu.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    initialize: function(){
        debug( '#initialize' );
    },

    serializeData: function(){
        return this.collection.selected.toJSON();
    }
} );
