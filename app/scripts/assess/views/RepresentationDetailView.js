'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var tpl = require('./templates/RepresentationDetailView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("#initialize");
    }
});
