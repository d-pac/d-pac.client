'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[ErrorView]' );
var tpl = require('./templates/ErrorView.hbs');
module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-12 colund",
    contextEvents : {
        "route:completed": "unsetModel"
    },
    collectionEvents : {
        "add" : "showError"
    },
    events : {
        "click @ui.alert .close" : "unsetModel"
    },
    ui: {
        alert : '#error-alert'
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

    unsetModel : function(){
        debug("#unsetModel");
        if(Backbone.history.fragment!==this.showing){
            this.model = undefined;
            this.render();
        }
    },
    //
    //onRender : function(){
    //    if( this.model && ! this.model.get('persistent') ){
    //        setTimeout(function(){
    //            this.model = null;
    //            this.$(this.ui.alert).alert('close');
    //        }.bind(this), 3000);
    //    }
    //},
    //
    showError : function(model){
        debug("#showError");
        this.showing=Backbone.history.fragment;
        this.model = model;
        this.render();
    }
});
