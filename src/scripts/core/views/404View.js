'use strict';
var tpl = require('./templates/404.hbs');
var Marionette = require('backbone.marionette');
var debug = require( 'debug' )( 'dpac:core.views', '[404View]' );

module.exports = Marionette.ItemView.extend({
    template : tpl,

    initialize: function(){
        debug('#initialize');
    }
});
