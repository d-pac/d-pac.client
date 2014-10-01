'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[SelectionView]' );
var tpl = require('./templates/SelectionView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,

    initialize : function(){
        debug("#initialize");
    }
});
