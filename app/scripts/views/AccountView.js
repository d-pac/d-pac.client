'use strict';
var debug = require('bows')('dpac:views');
var tpl = require('./templates/Account.hbs');
var UserModel = require('../models/UserModel');

module.exports = Backbone.Marionette.ItemView.extend({
    template : tpl,
    wiring : ['currentUser'],
    modelEvents : {
        "error": "modelError",
        "sync": "render"
    },
    initialize : function(){
        debug('AccountView#initialize');
        this.model = this.currentUser;
        this.model.fetch();
    },
    modelError : function(eventName){
        console.log('MODEL ERROR', this.model);
    }
});
