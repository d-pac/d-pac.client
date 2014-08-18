'use strict';
var debug = require('bows')('dpac:views');
var tpl = require('./templates/Menu.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug('MenuView#initialize');
    }
});
