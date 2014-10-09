'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[MinsizeWarning]' );
var tpl = require('./templates/MinsizeWarning.hbs');

module.exports = Marionette.ItemView.extend({
    el : '#size-warning',
    template : tpl,
    initialize : function(){
        debug("#initialize");
    }
});
