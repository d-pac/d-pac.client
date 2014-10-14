'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapDomain]' );

var BootstrapDomain = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapDomain.prototype, {
    wiring : ['config'],

    execute : function(){
        debug( '#execute' );

        var context = this.context;
        context.wireSingleton( 'assessmentsCollection', require( '../collections/AssessmentsCollection' ) );
        context.wireView( 'MementoModel', require( '../models/MementoProxy' ), {
            parser : 'mementoParser'
        } );
        context.wireSingleton( 'mementosCollection', require( '../collections/MementosCollection' ) );
        context.wireSingleton( 'mementoParser', require( '../services/MementoParser' ) );
        context.wireSingleton( 'timelogger', require( '../collections/TimelogsCollection' ) );
        context.configure('timelogger', undefined, this.config.timelogs);

        context.wireCommand( "mementos:selection:completed", require( './MementoController' ) );

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
