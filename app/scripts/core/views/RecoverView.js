'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[RecoverView]' );
var tpl = require('./templates/RecoverView.hbs');

module.exports = Marionette.ItemView.extend({
    wiring : ['authService'],
    template : tpl,
    className : "row",

    initialize : function(){
        debug("#initialize");
    },

    onRender : function(){
        debug.debug('#onRender');
        setTimeout(function(){
            this.authService.once("AuthService:getStatus:succeeded", function(){
                location.reload();
            }, this);
            this.authService.getStatus();
        }.bind(this), 10000)
    }
});
