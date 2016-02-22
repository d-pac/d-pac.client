'use strict';
var _ = require( 'lodash' );
var Marionette = require( 'backbone.marionette' );

var debug = require( 'debug' )( 'dpac:results.views', '[FeedbackOverview]' );
var tpl = require( './templates/FeedbackTable.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,

    initialize: function(){
        debug( '#initialize' );
    },

    serializeData: function(){
        var data = this.collection.toJSON().map( function( feedback ){
            feedback.anon = feedback.author.substr( feedback.author.length - 4 );
            return feedback;
        } );
        return {
            feedback: data,
            representation: this.representations.selected.toJSON()
        };
    }
} );