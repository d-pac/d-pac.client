'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[ErrorView]' );
var tpl = require('./templates/ErrorView.hbs');
module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-12 colund",
    contextEvents : {
        "route:requested": "unsetModel"
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
        this.model = undefined;
        this.render();
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

        this.model = model;
        this.render();
    }
});
