'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[ErrorView]' );
var tpl = require('./templates/ErrorView.hbs');
module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-12 colund",
    collectionEvents : {
        "add" : "showError"
    },
    ui: {
        alert : '#error-alert'
    },
    events : {
        "click @ui.alert .close" : "unsetModel"
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
