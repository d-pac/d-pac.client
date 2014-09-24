'use strict';

var debug = require( 'debug' )( 'dpac:views', '[<%= file.name %>]' );
var tpl = require('./templates/<%= file.name %>.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("#initialize");
    }
});
