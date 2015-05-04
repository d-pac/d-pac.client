'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[MenuView]' );
var tpl = require( './templates/Menu.hbs' );

module.exports = Backbone.Marionette.ItemView.extend( {
    config: undefined,
    pendingRequests: undefined,

    template: tpl,
    modelEvents: {
        "change:loggedin": "render"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    onRender: function(){
        var self = this;
        var client = new ZeroClipboard( this.$( "#copy-button" ) );
        client.on( "copy", function( event ){
            console.log( 'COPYING' );
            var clipboard = event.clipboardData;
            var data = {
                now: moment(),
                url: window.location.href,
                version: self.config.app.version,
                request: self.pendingRequests.getLastRequest(),
                userAgent: navigator.userAgent
            };
            clipboard.setData( "text/plain", '```json\n' + JSON.stringify( data ) + '\n```' );
        } );
    },

    serializeData: function(){
        var data = this.model.toJSON();
        _.defaults( data, {
            appVersion: this.config.app.version
        } );
        return data;
    }
} );
