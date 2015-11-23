'use strict';

var _ = require( 'underscore' );
var Backbone = require( 'backbone' );
var Geppetto = require( 'backbone.geppetto' );
var debug = require( 'debug' )( 'dpac:assess', '[AssessmentContext]' );
var eventLog = require( 'debug' )( 'dpac:assess.events', '\u2709' );

module.exports = Geppetto.Context.extend( {
    initialize: function(){
        debug( "#initialize" );
        var core = this.parentContext;
        this.wireValue( 'assessmentContext', this );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );
        this.vent.on('app:show:messages', function(event){
            core.dispatch('app:show:messages', event);
        });
        this.wireCommand("assess:startup:requested", require('./controllers/BootstrapApplication'));
    },

    start: function(){
        debug("#start");
        this.dispatch( 'assess:startup:requested' );
    },

    getMainView: function(){
        var factory = this.getObject( 'MainView' );
        return factory();
    }
} );
_.extend( module.exports.prototype, Backbone.Events );
