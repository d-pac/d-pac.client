'use strict';
var debug = require('debug')('dpac:core.views', '[MenuView]');
var tpl = require('./templates/Menu.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    template : tpl,
    modelEvents : {
        "change:loggedin":"render"
    },

    initialize : function(){
        debug('#initialize');
    }
});
