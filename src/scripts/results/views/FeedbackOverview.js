'use strict';
var Marionette = require( 'backbone.marionette' );

var debug = require( 'debug' )( 'dpac:results.views', '[FeedbackList]' );
var tpl = require( './templates/FeedbackList.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,

    collectionEvents: {
        "sync": function(){
            console.log( 'SYNCED' );
        }
    },

    initialize: function(){
        debug( '#initialize' );
    },

    serializeData: function(){
        var data = this.collection.toJSON().map(function(feedback){
            feedback.anon = feedback.author.substr(feedback.author.length - 4);
            return feedback;
        });
        return {
            feedback: data,
            representation: this.representations.selected.toJSON()
        };
    }
} );
