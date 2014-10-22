'use strict';
var debug = require('debug')('dpac:core.views', '[MenuView]');
var tpl = require('./templates/Menu.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    appVersion : undefined,

    template : tpl,
    modelEvents : {
        "change:loggedin":"render"
    },

    initialize : function(){
        debug('#initialize');
    },

    serializeData : function(){
        var data = this.model.toJSON();
        _.defaults(data, {
            appVersion : this.appVersion
        });
        return data;
    }
});
