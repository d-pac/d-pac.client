'use strict';
var tpl = require('./templates/404.hbs');
var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
    template : tpl
});
