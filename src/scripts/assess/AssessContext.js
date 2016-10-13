'use strict';

const {extend} = require( 'lodash' );
const {Events} = require( 'backbone' );
const {Context} = require( 'backbone.geppetto' );
const debug = require( 'debug' )( 'dpac:assess', '[AssessContext]' );
const eventLog = require( 'debug' )( 'dpac:assess.events', '\u2709' );

module.exports = Context.extend( {
    initialize: function(){
        debug( "#initialize" );
        this.wireValue( 'moduleContext', this );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );
        this.wireCommand("assess:startup:requested", require('./controllers/BootstrapModule'));
    },

    start: function(){
        debug("#start");
        this.dispatch( 'assess:startup:requested' );
    },

    getMainView: function(){
        if(this.hasWiring('MainView')){
            const factory = this.getObject( 'MainView' );
            return factory();
        }
    }
} );
extend( module.exports.prototype, Events );
