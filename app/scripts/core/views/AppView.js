'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[AppView]' );
var tpl = require( './templates/App.hbs' );

function viewFactory( viewName ){
    return function(){
        if( !this[viewName] ){
            throw new Error( viewName + ' not yet implemented!' );
        }
        var view = this[viewName]();
        this.contentRegion.show( view );
    }
}

module.exports = Marionette.LayoutView.extend( {
    template      : tpl,
    el            : "#app",
    wiring        : [
        'MenuView',
        'LoginView',
        //'AccountView',
        'WelcomeView',
        'NotFoundView',
        'AssessmentView',
        'ErrorView',
        'TutorialView',
        'RecoverView'
    ],
    regions       : {
        menuRegion    : "#app-menu",
        contentRegion : "#app-content",
        errorRegion   : "#app-errors"
    },
    contextEvents : {
        'route:signin:completed'   : viewFactory( "LoginView" ),
        'route:welcome:completed'  : viewFactory( "WelcomeView" ),
        "route:assess:completed"   : viewFactory( "AssessmentView" ),
        //'route:account:completed'  : viewFactory( "AccountView" ),
        'route:tutorial:completed' : viewFactory( "TutorialView" ),
        'route:404:completed'      : viewFactory( "NotFoundView" ),
        "backbone:sync:error"      : viewFactory( "RecoverView" )
    },

    initialize : function(){
        debug( '#initialize' );
    },

    onRender : function(){
        debug( '#render' );
        this.menuRegion.show( new this.MenuView() );
        this.errorRegion.show( new this.ErrorView() );
    },

    destroyContent : function( err ){
        console.log( 'destroycontent', err );
        if( err.fatal ){
            this.contentRegion.empty();
        }
    }

} );
