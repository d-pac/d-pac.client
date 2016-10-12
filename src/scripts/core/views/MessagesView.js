'use strict';
const {isArray, each} = require( 'lodash' );
const {Model} = require( 'backbone' );
const Marionette = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:core.views', '[MessagesView]' );
const tpl = require( './templates/Messages.hbs' );
const notie = require( 'notie' );
const $ = require( 'jquery' );

const types = {
    error: "#E53935",
    danger: "#E53935",
    success: "#8BC34A",
    info: "#80deea"
};

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    className: "col-md-8 col-md-offset-2 column",

    modelEvents: {
        "change:messages": "render"
    },
    contextEvents: {
        "app:show:messages": "showMessages",
        "app:reset:messages": "reset",
        "router:route:completed": "reset"
    },
    initialize: function( options ){
        debug( "#initialize" );
        this.model = new Model( {
            messages: []
        } );
    },

    reset: function(){
        this.model.set( 'messages', [] );
    },
    showMessages: function( messages ){
        debug( "showMessages", messages );
        if( !isArray( messages ) ){
            messages = [ messages ];
        }
        const alerts = [];
        each( messages, function( message ){
            const timeout = (message.permanent)
                ? 60 * 30 //30 minutes
                : 5;
            notie.alert( 0, message.message, timeout );
            //ugly hack until notie styling is in place
            $( '#notie-alert-outer' ).css( {
                "background-color": types[ message.type ],
                "display": "inline-block"
            } );
            $( '#notie-alert-inner' ).css( {
                width: "50%",
                margin: "0 auto",
                display: "block"
            } );
            $( '#notie-alert-text' ).css( {
                "font-size": "16px",
                "text-align": "justify",
                display: "block",
                "border-right": "1px solid rgba(255,255,255,0.3)"
            } );
        } );

        this.model.set( 'messages', alerts );
    }
} );
