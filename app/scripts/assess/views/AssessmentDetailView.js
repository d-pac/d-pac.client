'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentDetailView]' );
var tpl = require('./templates/AssessmentDetailView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-12 column",

    initialize : function(){
        debug("#initialize");
    }
});
