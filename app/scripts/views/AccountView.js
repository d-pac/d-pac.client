'use strict';

var tpl = require('./templates/Account.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    template : tpl
});
