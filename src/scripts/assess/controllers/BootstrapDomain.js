'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapDomain]' );

var BootstrapDomain = module.exports = function BootstrapDomain(){
    //constructor
};
_.extend( BootstrapDomain.prototype, {
    wiring: [ 'config' ],

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        //context.wireValue( 'assessmentsCollection', context.getObject( 'assessmentsFacade' ).get( 'assessor' ) );
        context.wireSingleton( 'phasesCollection', require( '../models/PhasesCollection' ) );
        context.wireSingleton( 'representationsCollection', require( '../../common/models/RepresentationsCollection' ) );
        context.wireSingleton( 'notesCollection', require( '../models/NotesCollection' ) );
        context.wireSingleton( 'feedbackCollection', require( '../../common/models/FeedbackCollection' ) );
        context.wireSingleton( 'comparisonsParser', require( '../services/ComparisonsParser' ), {
            representationsCollection: 'representationsCollection',
            notesCollection: 'notesCollection',
            feedbackCollection: 'feedbackCollection'
        } );
        context.wireSingleton( 'comparisonsCollection', require( '../models/ComparisonsCollection' ), {
            parser: 'comparisonsParser'
        } );

        context.wireSingleton( 'timelogsCollection', require( '../models/TimelogsCollection' ) );
        context.wireSingleton( 'navigationBlocker', require( './NavigationBlocker' ) );
        context.wireSingleton( 'assessFlow', require( '../controllers/AssessFlow' ), {
            assessmentsCollection: "assessmentsCollection",
            comparisonsCollection: "comparisonsCollection",
        } );
        context.wireSingleton( 'currentSelection', require( '../controllers/ComparisonController' ), {
            assessmentsCollection: "assessmentsCollection",
            comparisonsCollection: "comparisonsCollection",
            phasesCollection: "phasesCollection",
            representationsCollection: "representationsCollection",
            timelogsCollection: 'timelogsCollection',
            notesCollection: 'notesCollection',
            feedbackCollection: 'feedbackCollection',
            context: "moduleContext"
        } );
        context.getObject( 'currentSelection' );
        context.wireSingleton( 'timelogsController', require( './TimelogsController' ), {
            currentSelection: 'currentSelection',
            timelogsCollection: 'timelogsCollection',
            config: 'config'
        } );
    }
} );
