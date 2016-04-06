'use strict';

var debug = require( 'debug' )( 'dpac:uploads.controllers', '[NavigationBlocker]' );
var Marionette = require( 'backbone.marionette' );
var Backbone = require( 'backbone' );
var i18n = require( 'i18next' );

let selected = 0;

module.exports = Marionette.Controller.extend( {
    enabled: false,
    contextEvents: {
        'uploads:file:selected': "enable",
        'uploads:file:deselected': function(){
            this.disable(selected-1);
        }
    },

    initialize: function(){
        this.originalFn = Backbone.history.loadUrl;
    },

    enable: function(){
        debug( '#enable' );
        if( !selected ){
            selected++;
            var view = this;
            Backbone.history.loadUrl = function(){
                if( !window.confirm( i18n.t( 'uploads:overview.changes-made' ) ) ){
                    var previousFragment = Backbone.history.fragment;
                    window.location.hash = '#' + previousFragment;
                    return false;
                } else {
                    view.disable(0);
                    return view.originalFn.apply( this, arguments );
                }
            };
            window.onbeforeunload = this._returnMessage;
        }
    },

    _returnMessage: function(){
        return i18n.t( 'uploads:overview.changes-made' );
    },

    disable: function(counter){
        debug( '#disable' );
        selected = counter;
        if( selected<=0 ){
            selected = 0;
            Backbone.history.loadUrl = this.originalFn;
            window.onbeforeunload = undefined;
        }
    }
} );
