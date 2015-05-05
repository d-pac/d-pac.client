'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[MessagesView]' );
var tpl = require( './templates/Messages.hbs' );
module.exports = Marionette.ItemView.extend( {
    template: tpl,
    className: "col-md-8 col-md-offset-2 column",

    contextEvents: {
        "app:show:messages": "showMessages"
    },
    initialize: function( options ){
        debug( "#initialize" );
    },
    showMessages: function( messages ){
        debug( "showMessages", messages );
        if( !_.isArray( messages ) ){
            messages = [ messages ];
        }
        _.each( messages, function( message ){
            if( message.icon && message.icon !== true ){
                switch( message.type ){
                    case "success":
                        message.icon = "fa-check-circle";
                        break;
                    case "info":
                        message.icon = "fa-info-circle";
                        break;
                    case "danger":
                    case "warning":
                        message.icon = "fa-exclamation-circle";
                        break;
                }
            }
            message.id = "message-"+ Date.now()+ "-" + Math.random().toString().substr(2);
        } );
        this.model = new Backbone.Model( {
            messages: messages
        } );
        //$(".alert").fadeIn(3000 );
        this.render();
        //$(message.id ).fadeIn(5000);
    }
} );
