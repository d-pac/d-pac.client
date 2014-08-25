'use strict';
var debug = require( 'bows' )( 'dpac:routers' );

module.exports = Backbone.Router.extend( {
    routes : {
        "signin"    : "routeToAccount",
        "signout"   : "routeToSignout",
        "assess"    : "routeToAssess",
        "account"   : "routeToAccount",
        "welcome"   : "routeToWelcome",
        "tutorial"  : "routeToTutorial",
        ""          : "routeToWelcome",
        "*notfound" : "routeTo404"
    },
    contextEvents : {
        "AuthService:signout:succeeded" : "routeToWelcome",
        "AuthService:signin:succeeded" : "routeToAccount"
    },
    wiring : ['authService'],

    initialize : function(){
        debug( 'RouteController#initialize' );

        this.on( "navigate", function( target ){
            this.navigate( target );
            this.dispatch( 'route:' + target + ':completed', {
                target : target
            } );
        }, this );
    },

    routeToSignout : function routeTo404(){
        this.trigger('navigate', 'signout');
    },

    routeTo404 : function routeTo404(){
        this.trigger('navigate', '404');
    },

    routeToWelcome : function routeToWelcome(){
        this.trigger('navigate', 'welcome');
    },

    routeToTutorial : function routeToTutorial(){
        this.trigger('navigate', 'tutorial');
    },

    routeToAccount : function routeToAccount(){
        debug( 'RouteController#routeToAccount' );
        this.authTarget( 'account' );
    },

    routeToAssess : function routeToAssess(){
        this.authTarget( 'assess' );
    },

    authTarget : function( target ){
        this.onEventGoto( 'AuthService:getStatus:failed', 'signin' );
        this.onEventGoto( 'AuthService:getStatus:succeeded', target );
        this.authService.getStatus();
    },

    onEventGoto : function( event,
                            target ){
        this.listenTo( this.authService, event, function(){
            this.stopListening( this.authService );
            this.trigger( 'navigate', target );
        } );
    }
} );
