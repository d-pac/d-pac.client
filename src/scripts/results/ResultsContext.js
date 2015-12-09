'use strict';

var _ = require( 'underscore' );
var Backbone = require( 'backbone' );
var Geppetto = require( 'backbone.geppetto' );
var debug = require( 'debug' )( 'dpac:results', '[ResultsContext]' );
var eventLog = require( 'debug' )( 'dpac:results.events', '\u2709' );

module.exports = Geppetto.Context.extend( {
    initialize: function(){
        debug( "#initialize" );
        var core = this.parentContext;
        this.wireValue( 'moduleContext', this );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );
        this.wireCommand("results:startup:requested", require('./controllers/BootstrapModule'));
    },

    start: function(){
        debug("#start");
        this.dispatch( 'results:startup:requested' );
    },

    getMainView: function(){
        if(this.hasWiring('MainView')){
            var factory = this.getObject( 'MainView' );
            return factory();
        }
    }
} );
_.extend( module.exports.prototype, Backbone.Events );
