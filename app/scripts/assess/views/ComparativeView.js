'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[ComparativeView]' );
var tpl = require('./templates/ComparativeView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("#initialize");
    }
});
