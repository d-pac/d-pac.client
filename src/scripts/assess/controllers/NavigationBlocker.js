'use strict';

var debug = require( 'debug' )( 'dpac:assess.controllers', '[NavigationBlocker]' );
var Marionette = require( 'backbone.marionette' );
var Backbone = require( 'backbone' );
var i18n = require( 'i18next' );

module.exports = Marionette.Controller.extend( {
    enabled: false,
    contextEvents: {
        'comparison:ui:rendered': "enable",
        'comparison:ui:destroyed': 'disable'
    },

    initialize: function(){
        this.originalFn = Backbone.history.loadUrl;
    },

    enable: function(){
        debug( '#enable' );
        if( !this.enabled ){
            this.enabled = true;
            var view = this;
            Backbone.history.loadUrl = function(){
                if( !window.confirm( i18n.t( 'assess:please_finish.message' ) ) ){ //eslint-disable-line no-alert
                    var previousFragment = Backbone.history.fragment;
                    window.location.hash = '#' + previousFragment;
                    return false;
                }
                view.disable();
                return view.originalFn.apply( this, arguments );
            };
            window.onbeforeunload = this._returnMessage;
        }
    },

    _returnMessage: function(){
        return i18n.t( 'assess:please_finish.message' );
    },

    disable: function(){
        debug( '#disable' );
        if( this.enabled ){
            Backbone.history.loadUrl = this.originalFn;
            window.onbeforeunload = undefined;
            this.enabled = false;
        }
    }
} );
