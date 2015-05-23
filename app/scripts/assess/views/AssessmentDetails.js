'use strict';
var Marionette = require( 'backbone.marionette' );
var _ = require( 'underscore' );
var debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentDetails]' );
var tpl = require( './templates/AssessmentDetails.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    className: "well",

    initialize: function(){
        debug( "#initialize" );
    },

    serializeData: function(){
        return this.model.get("assessment").toJSON();
    }
} );
