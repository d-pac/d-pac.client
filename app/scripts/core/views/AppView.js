'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[AppView]' );
var tpl = require( './templates/App.hbs' );
//var AccountView = require('./AccountView');

function viewFactory( viewName ){
    return function(){
        if( !this[viewName] ){
            throw new Error( viewName + ' not yet implemented!' );
        }
        var view = this[viewName]();
        this.contentRegion.show( view );
    }
}

var viewRouteMap = {
    "signin"   : "LoginView",
    "welcome"  : "WelcomeView",
    "assess"   : "AssessmentView",
    "account"  : "AccountView",
    "notfound" : "NotFoundView"
};

module.exports = Marionette.LayoutView.extend( {
    template      : tpl,
    el            : "#app",
    wiring        : [
        'MenuView',
        'LoginView',
        'AccountView',
        'WelcomeView',
        'NotFoundView',
        'AssessmentView',
        'ErrorView'
    ],
    regions       : {
        menuRegion    : "#app-menu",
        contentRegion : "#app-content",
        errorRegion   : "#app-errors"
    },
    contextEvents : {
        'route:completed' : "viewRequested"
    },

    initialize : function(){
        debug( '#initialize' );
    },

    onRender : function(){
        debug( '#render' );
        this.menuRegion.show( new this.MenuView() );
        this.errorRegion.show( new this.ErrorView() );
    },

    viewRequested : function( event ){
        var viewName=viewRouteMap[event.target];
        if( !this[viewName] ){
            throw new Error( viewName + ' not yet implemented!' );
        }
        var view = this[viewName]();
        this.contentRegion.show( view );
    }

} );
