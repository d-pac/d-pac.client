'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[AppView]' );
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
        'assessmentView'
    ],
    regions       : {
        menuRegion    : "#app-menu",
        contentRegion : "#app-content"
    },
    contextEvents : {
        'route:signin:completed'   : viewFactory( "LoginView" ),
        'route:welcome:completed'  : viewFactory( "WelcomeView" ),
        "route:assess:completed"   : function(){
            console.log('SHOW IT');
            this.contentRegion.show(this.assessmentView);
        },
        'route:account:completed'  : viewFactory( "AccountView" ),
        'route:tutorial:completed' : viewFactory( "TutorialView" ),
        'route:404:completed'      : viewFactory( "NotFoundView" )
    },

    initialize : function(){
        debug( '#initialize' );
    },

    onRender : function(){
        debug( '#render' );
        this.menuRegion.show( new this.MenuView() );
    }

} );