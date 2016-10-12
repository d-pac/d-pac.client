'use strict';

const {extend} = require( 'lodash' );
var Backbone = require( 'backbone' );
var Geppetto = require( 'backbone.geppetto' );
var debug = require( 'debug' )( 'dpac:uploads', '[UploadsContext]' );
var eventLog = require( 'debug' )( 'dpac:uploads.events', '\u2709' );

module.exports = Geppetto.Context.extend( {
    initialize: function(){
        debug( "#initialize" );
        this.wireValue( 'moduleContext', this );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );
        this.wireCommand("uploads:startup:requested", require('./controllers/BootstrapModule'));
    },

    start: function(){
        debug("#start");
        this.dispatch( 'uploads:startup:requested' );
    },

    getMainView: function(){
        if(this.hasWiring('MainView')){
            var factory = this.getObject( 'MainView' );
            return factory();
        }
    }
} );
extend( module.exports.prototype, Backbone.Events );
