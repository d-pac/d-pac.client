'use strict';

var debug = require( 'bows' )( 'dpac:views' );
var tpl = require('./templates/<%= file.name %>.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("<%= file.name %>#initialize");
    }
});
