'use strict';

const debug = require( 'debug' )( 'dpac:uploads.controllers', '[NavigationBlocker]' );
const { Controller } = require( 'backbone.marionette' );
const { history } = require( 'backbone' );
const { t } = require( 'i18next' );

let selected = 0;

module.exports = Controller.extend( {
    enabled: false,
    contextEvents: {
        'uploads:file:selected': "enable",
        'uploads:file:deselected': function(){
            if(selected){
                this.disable( selected - 1 );
            }
        }
    },

    enable: function(){
        debug( '#enable', selected );
        if( !selected ){
            const view = this;
            history.__dpac_uploads__overridden_loadUrl = history.loadUrl.bind( history );
            history.loadUrl = function( ...args ){
                if( !window.confirm( t( 'uploads:overview.changes-made' ) ) ){ //eslint-disable-line no-alert
                    const previousFragment = history.fragment;
                    window.location.hash = '#' + previousFragment;
                    return false;
                }
                view.disable( 0 );
                return history.__dpac_uploads__overridden_loadUrl( ...args );
            }.bind(history);
            window.onbeforeunload = this._returnMessage;
        }
        selected++;
    },

    _returnMessage: function(){
        return t( 'uploads:overview.changes-made' );
    },

    disable: function( counter ){
        debug( '#disable', counter );
        selected = counter;
        if( selected <= 0 && !!history.__dpac_uploads__overridden_loadUrl ){
            selected = 0;
            history.loadUrl = history.__dpac_uploads__overridden_loadUrl;
            history.__dpac_uploads__overridden_loadUrl = undefined;
            window.onbeforeunload = undefined;
        }
    }
} );
