'use strict';
var Marionette = require('backbone.marionette');
var debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentDetailView]' );
var tpl = require('./templates/AssessmentDetailView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-8 col-md-offset-2 column",

    initialize : function(){
        debug("#initialize");
    }
});
