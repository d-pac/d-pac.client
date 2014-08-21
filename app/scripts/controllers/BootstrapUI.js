'use strict';
var debug = require( 'bows' )( 'dpac:commands' );
var AppView = require( '../views/AppView' );
var MenuView = require( '../views/MenuView' );
var AccountView = require( '../views/AccountView' );
var LoginView = require( '../views/LoginView' );

var BootstrapUI = module.exports = function BootstrapUI(){
};

_.extend( BootstrapUI.prototype, {
    execute : function(){
        debug.log( 'BootstrapUI#execute' );
        this.context.wireView( 'MenuView', MenuView );
        this.context.wireView( 'AccountView', AccountView );
        this.context.wireView( 'LoginView', LoginView );
        this.context.wireView( 'AppView', AppView );

        AppView = this.context.getObject( 'AppView' );
        var appView = new AppView();
        Backbone.Geppetto.bindContext({
            view: appView,
            context : this.context
        });
        appView.render();
    }
} );

