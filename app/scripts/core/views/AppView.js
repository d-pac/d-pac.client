'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[AppView]' );
var tpl = require( './templates/App.hbs' );

module.exports = Marionette.LayoutView.extend( {
    template: tpl,
    el: "#app",

    menuFactory : undefined,
    signinFactory : undefined,
    errorViewFactory: undefined,
    welcomeFactory : undefined,

    regions: {
        menuRegion: "#app-menu",
        contentRegion: "#app-content",
        errorRegion: "#app-errors"
    },
    contextEvents: {
        'app:view:requested': "handleViewRequest"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    onRender: function(){
        debug( '#render' );
        this.menuRegion.show( this.menuFactory() );
        this.errorRegion.show( this.errorViewFactory() );
    },

    handleViewRequest: function( request ){
        debug( "#handleViewRequest", request.view );
        this.showView( request.view );
    },

    showView: function( viewName ){
        var fName =  viewName+ "Factory";
        if( !this[ fName ] ){
            throw new Error( viewName + ' not yet implemented!' );
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
