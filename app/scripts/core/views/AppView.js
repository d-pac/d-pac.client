'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[AppView]' );
var tpl = require( './templates/App.hbs' );

module.exports = Marionette.LayoutView.extend( {
    template: tpl,
    el: "#app",

    menuFactory : undefined,
    signinFactory : undefined,
    messagesViewFactory: undefined,
    welcomeFactory : undefined,

    regions: {
        menuRegion: "#app-menu",
        contentRegion: "#app-content",
        messagesRegion: "#app-messages"
    },
    contextEvents: {
        'router:route:completed': "handleViewRequest"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    onRender: function(){
        debug( '#render' );
        this.menuRegion.show( this.menuFactory() );
        this.messagesRegion.show( this.messagesViewFactory() );
    },

    handleViewRequest: function( request ){
        debug( "#handleViewRequest", request.route );
        this.showView( request.route );
    },

    showView: function( viewName ){
        var fName =  viewName+ "Factory";
        if( !this[ fName ] ){
            //throw new Error( viewName + ' not yet implemented!' );
            return; //not all routes need a view
        }
        var view = this[ fName ]();
        this.contentRegion.show( view );
    },

    destroyContent: function( err ){
        console.log( 'destroycontent', err );
        if( err.fatal ){
            this.contentRegion.empty();
        }
    }

} );
