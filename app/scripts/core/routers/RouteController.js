'use strict';
var debug = require( 'debug' )( 'dpac:core.routers', '[RouteController]' );

module.exports = Backbone.Router.extend( {
    routes        : {
        "signout"   : "triggerSignout",
        "welcome"   : "triggerWelcome",
        "tutorial"  : "triggerTutorial",
        "signin"    : "routeToAccount",
        "assess"    : "routeToAssess",
        "account"   : "routeToAccount",
        ""          : "triggerWelcome",
        "*notfound" : "trigger404"
    },
    contextEvents : {
        "AuthService:signout:succeeded" : "triggerWelcome",
        "AuthService:signin:succeeded"  : "triggerAssess"
    },
    wiring        : ['authService'],

    initialize : function(){
        debug( '#initialize' );

        var self = this;

        this.authService.on( "change:loggedin", function(){
            self.verifyLoginState();
        } );

        this.on( "navigate", function( target ){
            this.navigate( target );
            this.dispatch( 'route:' + target + ':completed' );
            this.dispatch( 'route:completed', {
                target : target
            } );
        }, this );
    },

    execute : function( callback,
                        args ){
        this.dispatch( 'route:' + Backbone.history.fragment + ':requested' );
        this.dispatch( 'route:requested', {
            target : Backbone.history.fragment
        } );
        if( callback ){
            callback.apply( this, args );
        }
    },

    triggerSignout : function routeToSignout(){
        this.trigger( 'navigate', 'signout' );
    },

    trigger404 : function routeTo404(){
        this.trigger( 'navigate', '404' );
    },

    triggerWelcome : function routeToWelcome(){
        this.trigger( 'navigate', 'welcome' );
    },

    triggerTutorial : function routeToTutorial(){
        this.trigger( 'navigate', 'tutorial' );
    },

    triggerAccount : function triggerAccount(){
        this.trigger( 'navigate', 'account' );
    },

    routeToAccount : function routeToAccount(){
        this.authTarget( 'account' );
    },

    triggerAssess : function triggerAssess(){
        this.trigger( 'navigate', 'assess' );
    },

    routeToAssess : function routeToAssess(){
        this.authTarget( 'assess' );
    },

    authTarget : function( target ){
        this.authService.once( 'AuthService:getStatus:succeeded', function(){
            if( this.authService.isLoggedin() ){
                this.trigger( 'navigate', target );
            }else{
                this.trigger( 'navigate', 'signin' );
            }
        }, this );
        this.authService.getStatus();
    },

    verifyLoginState : function(){
        if( !this.authService.isLoggedin() ){
            this.trigger( 'navigate', 'signin' );
        }
    }
} );
