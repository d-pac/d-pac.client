'use strict';
var debug = require( 'bows' )( 'dpac:views' );
var tpl = require( './templates/App.hbs' );
//var AccountView = require('./AccountView');

module.exports = Marionette.LayoutView.extend( {
    template      : tpl,
    el            : "#app",
    wiring        : [
        'MenuView',
        'LoginView',
        'AccountView',
        'WelcomeView'
    ],
    regions       : {
        menuRegion    : "#app-menu",
        contentRegion : "#app-content"
    },
    contextEvents : {
        'route:signin:completed'   : "showLogin",
        'route:welcome:completed'  : "showWelcome",
        'route:assess:completed'   : "showAssess",
        'route:account:completed'  : "showAccount",
        'route:tutorial:completed' : "showTutorial",
        'route:404:completed'      : "showWelcome"
    },

    initialize : function(){
        debug( 'AppView#initialize' );
    },

    onRender : function(){
        debug( 'AppView#render' );
        this.menuRegion.show( new this.MenuView() );
        //this.contentRegion.show(new this.LoginView());
    },

    showLogin : function(){
        debug( 'AppView#showLogin' );
        this.contentRegion.show( new this.LoginView() );
    },

    showAccount : function(){
        debug( 'AppView#showAccount' );
        var accountView = new this.AccountView();
        this.contentRegion.show( accountView );
    },

    showWelcome : function(){
        debug( 'AppView#showWelcome' );
        this.contentRegion.show( new this.WelcomeView() );
    },

    showAssess : function(){
        debug( 'AppView#showAssess' );

    },

    showTutorial : function(){
        debug( 'AppView#showTutorial' );

    }
} );
