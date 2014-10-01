'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[PassFailView]' );
var tpl = require('./templates/PassFailView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("#initialize");
    }
});
