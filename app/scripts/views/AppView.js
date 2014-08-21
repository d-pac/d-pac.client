'use strict';
var debug = require('bows')('dpac:views');
var tpl = require('./templates/App.hbs');
//var AccountView = require('./AccountView');

module.exports = Marionette.LayoutView.extend({
    template : tpl,
    el: "#app",
    wiring : [
        'MenuView',
        'LoginView',
        'AccountView'
    ],
    regions : {
        menuRegion : "#app-menu",
        contentRegion : "#app-content"
    },
    contextEvents : {
        'AuthService:signin:succeeded' : "showAccount"
    },

    initialize : function(){
        debug('AppView#initialize');
    },

    onRender : function(){
        this.menuRegion.show(new this.MenuView());
        this.contentRegion.show(new this.LoginView());
    },

    showAccount : function(){
        console.log('showAccount');
        var accountView = new this.AccountView();
        this.contentRegion.show(accountView);
    }
});
