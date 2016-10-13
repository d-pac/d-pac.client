'use strict';
const {get, defaults} = require( 'lodash' );
const {ItemView} = require( 'backbone.marionette' );

const debug = require( 'debug' )( 'dpac:core.views', '[MenuView]' );
const tpl = require( './templates/Menu.hbs' );

module.exports = ItemView.extend( {
    config: undefined,
    pendingRequests: undefined,
    permissions: undefined,

    template: tpl,
    modelEvents: {
        "change:authenticated": "render"
    },

    ui: {
        menuBtn: ".nav a",
        navbar: ".navbar"
    },

    events: {
        "click @ui.menuBtn": "collapseMenu"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    onRender: function(){
        const bgColor = get(this.config, 'ui.admin', false);
        if(this.permissions.isAllowed('admin.view') && bgColor){
            this.ui.navbar.css('background-color', bgColor);
        }
    },

    collapseMenu: function(){
        const $navbarToggle = this.$( '.navbar-toggle' );
        if( $navbarToggle.css( 'display' ) !== 'none' ){
            $navbarToggle.trigger( "click" );
        }
    },

    serializeData: function(){
        var data = this.model.toJSON();
        defaults( data, {
            appVersion: get( this.config, 'app.version', '' ),
            permissions: this.permissions.toJSON()
        } );

        return data;
    }
} );
