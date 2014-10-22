'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[MenuView]' );
var tpl = require( './templates/Menu.hbs' );

module.exports = Backbone.Marionette.ItemView.extend( {
    appVersion : undefined,
    pendingRequests : undefined,

    template    : tpl,
    modelEvents : {
        "change:loggedin" : "render"
    },

    initialize : function(){
        debug( '#initialize' );
    },

    onRender : function(){
        var self = this;
        var client = new ZeroClipboard( this.$( "#copy-button" ) );
        client.on( "copy", function( event ){
            console.log('COPYING');
            var clipboard = event.clipboardData;
            var data = {
                now : moment(),
                url : window.location.href,
                version : self.appVersion,
                request : self.pendingRequests.getLastRequest()
            };
            clipboard.setData( "text/plain", '```json\n'+JSON.stringify(data)+'\n```' );
        } );
    },

    serializeData : function(){
        var data = this.model.toJSON();
        _.defaults( data, {
            appVersion : this.appVersion
        } );
        return data;
    }
} );
