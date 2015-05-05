'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[WelcomeView]' );
var tpl = require( './templates/Welcome.hbs' );
module.exports = Marionette.ItemView.extend( {
    template: tpl,

    initialize: function(){
        debug( "#initialize" );
        this.model = this.collection.get( "tool-welcome" );
        if( !this.model ){
            this.collection.once( "sync", function(){
                this.model = this.collection.get( "tool-welcome" )
                this.render();
            }.bind(this) );
        }
    }
} );
