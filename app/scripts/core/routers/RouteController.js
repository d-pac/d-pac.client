'use strict';
var debug = require( 'debug' )( 'dpac:core.routers', '[RouteController]' );

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
        "AuthService:signin:succeeded" : "triggerAssess"
    },
    wiring : ['authService'],

    initialize : function(){
        debug( '#initialize' );

        var self = this;

        this.authService.on("change:loggedin", function(){
            self.verifyLoginState();
        });

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
        this.authService.once('AuthService:getStatus:succeeded', function(){
            if(this.authService.isLoggedin()){
                this.trigger( 'navigate', target );
            }else{
                this.trigger( 'navigate', 'signin');
            }
        }, this );
        this.authService.getStatus();
    },

    verifyLoginState : function(){
        if(!this.authService.isLoggedin()){
            this.trigger('navigate', 'signin');
        }
    }
} );
