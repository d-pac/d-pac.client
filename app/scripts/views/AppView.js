'use strict';
var tpl = require('./templates/App.hbs');
var MenuView = require('./MenuView');
var temp = require('./AccountView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template : tpl,
    el: "#app",
    regions : {
        menuRegion : "#app-menu",
        contentRegion : "#app-content"
    },

    onRender : function(){
        this.menuRegion.show(new MenuView());
        this.contentRegion.show(new temp());
    }
});
