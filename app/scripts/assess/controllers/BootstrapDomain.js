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
        context.wireSingleton( 'assessmentsCollection', require( '../collections/AssessmentsCollection' ) );
        context.wireSingleton( 'phasesCollection', require( '../collections/PhasesCollection' ) );
        context.wireSingleton( 'representationsCollection', require( '../collections/RepresentationsCollection' ) );
        context.wireSingleton( 'comparisonsParser', require( '../services/ComparisonsParser' ), {
            representationsCollection: 'representationsCollection'
        } );
        context.wireSingleton( 'comparisonsCollection', require( '../collections/ComparisonsCollection' ), {
            parser: 'comparisonsParser'
        } );

        context.wireSingleton( 'assessmentFlow', require( '../controllers/AssessmentFlow' ),{
            assessmentsCollection: "assessmentsCollection",
            comparisonsCollection: "comparisonsCollection",
            phasesCollection: "phasesCollection",
            representationsCollection: "representationsCollection",
            context: "assessmentContext"
        } );
        //context.wireSingleton( 'timelogger', require( '../collections/TimelogsCollection' ) );
        //context.configure('timelogger', undefined, this.config.timelogs);
        //
        //context.wireCommand( "mementos:selection:completed", require( './MementoController' ) );
        //
        //this.context = undefined;
        //this.eventName = undefined;
        //this.eventData = undefined;
    }
} );
