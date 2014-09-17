'use strict';
var debug = require('debug')('dpac:views', '[MenuView]');
var tpl = require('./templates/Menu.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug('#initialize');
    }
});
