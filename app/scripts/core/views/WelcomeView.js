'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[WelcomeView]' );
var tpl = require( './templates/Welcome.hbs' );
var Marionette = require('backbone.marionette');

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
    },

    serializeData: function(){
        if(this.model){
            var data = this.model.toJSON();
            data.authenticated = this.auth.get('authenticated');
            return data;
        }
    }
} );
