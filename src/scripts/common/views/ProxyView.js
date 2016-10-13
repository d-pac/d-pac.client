'use strict';
const tpl = require('./templates/ProxyView.hbs');
const {LayoutView} = require('backbone.marionette');

module.exports = LayoutView.extend({
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
