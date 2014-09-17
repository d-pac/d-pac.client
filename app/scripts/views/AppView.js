'use strict';
var debug = require( 'bows' )( 'dpac:views' );
var tpl = require( './templates/App.hbs' );
//var AccountView = require('./AccountView');

function viewFactory( viewName ){
    return function(){
        var view = this[viewName]();
        this.contentRegion.show( view );
    }
}

module.exports = Marionette.LayoutView.extend( {
    template      : tpl,
    el            : "#app",
    wiring        : [
        'context',
        'MenuView',
        'LoginView',
        'AccountView',
        'WelcomeView',
        'NotFoundView',
        'AssessmentView'
    ],
    regions       : {
        menuRegion    : "#app-menu",
        contentRegion : "#app-content"
    },
    contextEvents : {
        'route:signin:completed'   : viewFactory( "LoginView" ),
        'route:welcome:completed'  : viewFactory( "WelcomeView" ),
        "route:assess:completed"   : viewFactory( "AssessmentView" ),
        'route:account:completed'  : viewFactory( "AccountView" ),
        'route:tutorial:completed' : viewFactory( "TutorialView" ),
        'route:404:completed'      : viewFactory( "NotFoundView" )
    },

    initialize : function(){
        debug( 'AppView#initialize' );
    },

    onRender : function(){
        debug( 'AppView#render' );
        this.menuRegion.show( new this.MenuView() );
    }

} );
