'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[ErrorView]' );
var tpl = require('./templates/ErrorView.hbs');
module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-12 colund",
    collectionEvents : {
        "add" : "showError"
    },

    initialize : function(options){
        debug("#initialize");
    },

    serializeData : function(){
        if(this.model){
            return _.defaults({
                showing : true
            }, this.model.toJSON());
        }else{
            return {
                showing:false
            }
        }
    },

    showError : function(model){
        debug("#showError");

        this.model = model;
        this.render();
    }
});
