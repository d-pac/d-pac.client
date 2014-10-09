'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[JudgementDetailView]' );
var tpl = require('./templates/JudgementDetailView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-6 column",
    initialize : function(){
        debug("#initialize");
    }
});
