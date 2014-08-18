'use strict';
var debug = require('bows')('dpac:views');
var tpl = require('./templates/Account.hbs');
var UserModel = require('../models/UserModel');

module.exports = Backbone.Marionette.ItemView.extend({
    template : tpl,
    wiring : ['userModel'],
    modelEvents : {
        "error": "modelError",
        "sync": "modelSync"
    },
    initialize : function(){
        debug('AccountView#initialize');
        this.model = this.userModel;
        this.model.fetch();
    },
    modelError : function(eventName){
        console.log('MODEL ERROR', this.model);
    },
    modelSync : function(eventName){
        console.log('MODEL SYNC', this.model);
    }
});
