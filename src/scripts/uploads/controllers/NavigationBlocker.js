'use strict';

const debug = require( 'debug' )( 'dpac:uploads.controllers', '[NavigationBlocker]' );
const {Controller} = require( 'backbone.marionette' );
const {history} = require( 'backbone' );
const {t} = require( 'i18next' );

let selected = 0;

module.exports = Controller.extend( {
    enabled: false,
    contextEvents: {
        'uploads:file:selected': "enable",
        'uploads:file:deselected': function(){
            this.disable( selected - 1 );
        }
    },

    initialize: function(){
        this.__original_loadUrl = history.loadUrl;
    },

    enable: function(){
        debug( '#enable' );
        if( !selected ){
            selected++;
            history.loadUrl = (...args)=>{
                if( !window.confirm( t( 'uploads:overview.changes-made' ) ) ){ //eslint-disable-line no-alert
                    const previousFragment = history.fragment;
                    window.location.hash = '#' + previousFragment;
                    return false;
                }
                this.disable( 0 );
                return this.__original_loadUrl( ...args );
            };
            window.onbeforeunload = this._returnMessage;
        }
    },

    _returnMessage: function(){
        return t( 'uploads:overview.changes-made' );
    },

    disable: function( counter ){
        debug( '#disable' );
        selected = counter;
        if( selected <= 0 ){
            selected = 0;
            history.loadUrl = this.__original_loadUrl;
            window.onbeforeunload = undefined;
        }
    }
} );
