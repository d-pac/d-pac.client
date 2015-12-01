'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapDomain]' );

var BootstrapDomain = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapDomain.prototype, {
    wiring: [ 'config' ],

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireValue( 'assessmentsCollection', context.getObject( 'assessmentsFacade' ).get( 'assessor' ) );
        context.wireSingleton( 'phasesCollection', require( '../collections/PhasesCollection' ) );
        context.wireSingleton( 'representationsCollection', require( '../collections/RepresentationsCollection' ) );
        context.wireSingleton( 'notesCollection', require( '../collections/NotesCollection' ) );
        context.wireSingleton( 'comparisonsParser', require( '../services/ComparisonsParser' ), {
            representationsCollection: 'representationsCollection',
            notesCollection: 'notesCollection'
        } );
        context.wireSingleton( 'comparisonsCollection', require( '../collections/ComparisonsCollection' ), {
            parser: 'comparisonsParser'
        } );

        context.wireSingleton( 'timelogsCollection', require( '../collections/TimelogsCollection' ) );
        context.wireSingleton( 'timelogsController', require( './TimelogsController' ) );
        context.wireSingleton( 'navigationBlocker', require( './NavigationBlocker' ) );
        context.wireSingleton( 'assessFlow', require( '../controllers/AssessFlow' ), {
            assessmentsCollection: "assessmentsCollection",
            comparisonsCollection: "comparisonsCollection",
            phasesCollection: "phasesCollection",
            representationsCollection: "representationsCollection",
            timelogsCollection: 'timelogsCollection',
            notesCollection: 'notesCollection',
            context: "moduleContext"
        } );
        //context.configure('timelogger', undefined, this.config.timelogs);
        //
        //context.wireCommand( "mementos:selection:completed", require( './MementoController' ) );
        //
        //this.context = undefined;
        //this.eventName = undefined;
        //this.eventData = undefined;
    }
} );
