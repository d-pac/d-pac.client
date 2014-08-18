'use strict';
var debug = require('bows')('dpac:views');
var tpl = require('./templates/App.hbs');

module.exports = Backbone.Marionette.LayoutView.extend({
    template : tpl,
    el: "#app",
    wiring : [
        'menuView',
        'accountView',
        'loginView'
    ],
    regions : {
        menuRegion : "#app-menu",
        contentRegion : "#app-content"
    },

    initialize : function(){
        debug('AppView#initialize');
    },

    onRender : function(){
        this.menuRegion.show(this.menuView);
        this.contentRegion.show(this.loginView);
    }
});
