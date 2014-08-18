'use strict';

var tpl = require('./templates/Menu.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    template : tpl
});
