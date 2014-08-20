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
        this.context.wireSingleton( 'menuView', MenuView );
        this.context.wireSingleton( 'accountView', AccountView );
        this.context.wireSingleton( 'loginView', LoginView );
        this.context.wireSingleton( 'appView', AppView );
        var appView = this.context.getObject( 'appView' );
        appView.render();
    }
} );

