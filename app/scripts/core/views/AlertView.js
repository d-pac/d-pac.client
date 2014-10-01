'use strict';
var tpl = require('./templates/Alert.hbs')
module.exports = Marionette.ItemView.extend({
    template : tpl,
    model : new Backbone.Model(),
    initialize : function(options){
        this.model.set('message', options.message);
    }
});
