'use strict';
var Marionette = require( 'backbone.marionette' );

var debug = require( 'debug' )( 'dpac:results.views', '[AssessmentOverview]' );
var tpl = require( './templates/AssessmentOverview.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    initialize: function(){
        debug( '#initialize', this.cid );
    },

    serializeData: function(){
        return this.collection.selected.toJSON();
    }
} );
