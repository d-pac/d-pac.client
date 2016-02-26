'use strict';
var _ = require( 'lodash' );
var Marionette = require( 'backbone.marionette' );

var debug = require( 'debug' )( 'dpac:core.views', '[MenuView]' );
var tpl = require( './templates/Menu.hbs' );

module.exports = Marionette.ItemView.extend( {
    config: undefined,
    pendingRequests: undefined,
    permissions: undefined,

    template: tpl,
    modelEvents: {
        "change:authenticated": "render"
    },

    ui: {
        menuBtn: ".nav a"
    },

    events: {
        "click @ui.menuBtn": "collapseMenu"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    collapseMenu: function(){
        var $navbarToggle = this.$( '.navbar-toggle' );
        if( $navbarToggle.css( 'display' ) != 'none' ){
            $navbarToggle.trigger( "click" );
        }
    },

    serializeData: function(){
        var data = this.model.toJSON();
        _.defaults( data, {
            appVersion: _.get( this.config, 'app.version', '' ),
            permissions: this.permissions.toJSON()
        } );

        return data;
    }
} );
