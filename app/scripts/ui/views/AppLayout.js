'use strict';
var tpl = require('./AppLayout.hbs');
var MenuView = require('./Menu');

module.exports = Backbone.Marionette.LayoutView.extend({
    template : tpl,
    el: "#app",
    regions : {
        menuRegion : "#app-menu"
    },

    onRender : function(){
        this.menuRegion.show(new MenuView());
    }
});
