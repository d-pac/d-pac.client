'use strict';
var _ = require( 'underscore' );
var Backbone = require( 'backbone' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:core.views', '[MessagesView]' );
var tpl = require( './templates/Messages.hbs' );
var snackbar = require( 'snackbarjs' );
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
        this.model = new Backbone.Model( {
            messages: []
        } );
    },

    reset: function(){
        this.model.set( 'messages', [] );
    },
    showMessages: function( messages ){
        debug( "showMessages", messages );
        if( !_.isArray( messages ) ){
            messages = [ messages ];
        }
        var alerts = [];
        _.each( messages, function( message ){
            if( message.type === "error" ){
                message.type = "danger";
            }
            if( message.type === "danger" ){
                message.id = "message-" + Date.now() + "-" + Math.random().toString().substr( 2 );
                alerts.push( message );
            } else {
                var colorStyle;
                switch( message.type ){
                    case "success":
                        colorStyle = "well-material-light-green";
                        break;
                    case "info":
                    default:
                        colorStyle = "well-material-light-blue";
                        break;
                }
                snackbar( {
                    content: message.message,
                    style: "toast " + colorStyle,
                    timeout: 10000
                } );

            }
        } );

        this.model.set( 'messages', alerts );
    }
} );
