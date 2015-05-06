'use strict';
var _ = require( 'underscore' );
var Marionette = require('backbone.marionette');
var debug = require( 'debug' )( 'dpac:assess.views', '[JudgementDetailView]' );
var tpl = require('./templates/JudgementDetailView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-sm-6 column",
    ui : {
        notes : "textarea"
    },
    events : {
        "input @ui.notes" : "notesChanged"
    },

    initialize : function(){
        debug("#initialize");
    },

    notesChanged : _.debounce(function(){
        this.model.set( {notes: this.$(this.ui.notes ).val()});
    }, 1000)
});
