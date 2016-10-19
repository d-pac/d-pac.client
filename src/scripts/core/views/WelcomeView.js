'use strict';

const debug = require( 'debug' )( 'dpac:core.views', '[WelcomeView]' );
const tpl = require( './templates/Welcome.hbs' );
const {ItemView} = require( 'backbone.marionette' );

module.exports = ItemView.extend( {
    template: tpl,

    initialize: function(){
        debug( "#initialize" );
        this.model = this.collection.get( "tool-welcome" );
        if( !this.model ){
            this.collection.once( "sync", function(){
                this.model = this.collection.get( "tool-welcome" );
                this.render();
            }, this );
        }
    },

    serializeData: function(){
        if( this.model ){
            const data = this.model.toJSON();
            data.authenticated = this.auth.get( 'authenticated' );
            data.user = this.auth.get( 'user' );
            data.permissions = this.permissions.toJSON();
            return data;
        }
    }
} );
