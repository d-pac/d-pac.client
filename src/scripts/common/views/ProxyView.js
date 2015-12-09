'use strict';
var tpl = require('./templates/ProxyView.hbs');
var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
    template: tpl,
    regions: {
        content: ".content-proxy"
    },

    initialize: function(opts){
        opts = opts || {};
        this.contentFactory = opts.contentFactory;
    },

    onRender : function(){
        var view = this.contentFactory();
        if(view){
            this.content.show(view);
        }
    }
});
