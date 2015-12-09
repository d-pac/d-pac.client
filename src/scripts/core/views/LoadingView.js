'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[LoadingView]' );
var tpl = require('./templates/Loading.hbs');
var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(opts){
        debug("#initialize");
    }
});
