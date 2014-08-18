'use strict';

var debug = require('bows')('dpac:views');
var tpl = require('./templates/Login.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    template: tpl,

    initialize : function(){
        debug('LoginView#initialize');
    }
});
