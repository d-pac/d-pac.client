'use strict';
var debug = require( 'debug' )( 'dpac:routers', '[RouteController]' );

module.exports = Backbone.Router.extend( {
    routes : {
        "signin"    : "routeToAccount",
        "signout"   : "triggerSignout",
        "assess"    : "routeToAssess",
        "account"   : "routeToAccount",
        "welcome"   : "triggerWelcome",
        "tutorial"  : "triggerTutorial",
        ""          : "triggerWelcome",
        "*notfound" : "trigger404"
    },
    contextEvents : {
        "AuthService:signout:succeeded" : "triggerWelcome",
        "AuthService:signin:succeeded" : "triggerAccount"
    },
    wiring : ['authService'],

    initialize : function(){
        debug( '#initialize' );

        this.on( "navigate", function( target ){
            this.navigate( target );
            this.dispatch( 'route:' + target + ':completed', {
                target : target
            } );
        }, this );
    },

    triggerSignout : function routeToSignout(){
        this.trigger('navigate', 'signout');
    },

    trigger404 : function routeTo404(){
        this.trigger('navigate', '404');
    },

    triggerWelcome : function routeToWelcome(){
        this.trigger('navigate', 'welcome');
    },

    triggerTutorial : function routeToTutorial(){
        this.trigger('navigate', 'tutorial');
    },

    triggerAccount : function triggerAccount(){
        this.trigger('navigate', 'account');
    },

    routeToAccount : function routeToAccount(){
        this.authTarget( 'account' );
    },

    triggerAssess : function triggerAssess(){
      this.trigger('navigate', 'assess');
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
