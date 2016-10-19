'use strict';
const debug = require( 'debug' )( 'dpac:core.views', '[AppView]' );
const tpl = require( './templates/App.hbs' );
const {Region, LayoutView} = require('backbone.marionette');
const menuRegion = Region.extend({ el: '#app-menu' });
module.exports = LayoutView.extend( {
    template: tpl,
    el: "#app",

    menuFactory : undefined,
    signinFactory : undefined,
    messagesViewFactory: undefined,
    welcomeFactory : undefined,
    tutorialFactory : undefined,
    assessFactory: undefined,
    accountFactory: undefined,
    resultsFactory: undefined,
    uploadsFactory: undefined,

    regions: {
        menuRegion: menuRegion,
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
        const fName = viewName+ "Factory";
        if( !this[ fName ] ){
            //throw new Error( viewName + ' not yet implemented!' );
            return; //not all routes need a view
        }
        const view = this[ fName ]();
        this.contentRegion.show( view );
    },

    destroyContent: function( err ){
        console.log( 'destroycontent', err );
        if( err.fatal ){
            this.contentRegion.empty();
        }
    }

} );
