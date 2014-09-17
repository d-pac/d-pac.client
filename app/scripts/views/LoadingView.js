'use strict';

var debug = require( 'debug' )( 'dpac:views', '[LoadingView]' );
var tpl = require('./templates/Loading.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(opts){
        debug("#initialize");
    }
});
