'use strict';
var Marionette = require( 'backbone.marionette' );
var _ = require( 'underscore' );
var debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentDetails]' );
var tpl = require( './templates/AssessmentDetails.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    className: "col-sm-12 column",

    initialize: function(){
        debug( "#initialize" );
    },

    serializeData: function(){
        return _.extend( this.model.get( "comparison" ).get( "progress" ), {
            title: this.model.get( "assessment" ).get( "title" )
        } );
    }
} );
