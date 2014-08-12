'use strict';
var tpl = require('./AppLayout.hbs');
var MenuView = require('./Menu');
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
