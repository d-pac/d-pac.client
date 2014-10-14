'use strict';

var debug = require( 'debug' )( 'dpac:assess.controllers', '[MementoController]' );
module.exports = Marionette.Controller.extend( {
    wiring        : ['timelogger'],
    contextEvents : {
        "assessment:teardown:requested" : "teardown"
    },

    execute : function(){
        debug( '#execute' );

        this.memento = this.eventData.memento;
        var representations = this.memento.get( 'representations' );
        var phases = this.memento.get( 'phases' );
        this.comparison = this.memento.get( 'comparison' );

        this.context.wireValue( 'currentAssessment', this.memento.get( 'assessment' ) );
        this.context.wireValue( 'currentComparison', this.comparison );
        this.context.wireValue( 'currentPhases', phases );
        this.context.wireValue( 'currentRepresentations', representations );
        this.context.wireValue( 'currentJudgements', this.memento.get( 'judgements' ) );
        this.context.wireValue( 'currentSeqs', this.memento.get( 'seqs' ) );

        representations.selectByID( this.comparison.get( 'selected' ) );
        phases.selectByID( this.comparison.get( 'phase' ) );
        this.logStart( this.comparison.get( 'phase' ) );

        this.listenTo( representations, 'select:one', this.representationSelected );
        this.listenTo( phases, 'deselect:one', this.phaseDeselected );
        this.listenTo( phases, 'select:one', this.phaseSelected );
        this.listenTo( phases, 'completed', this.completed );

    },

    teardown : function(){
        debug( "#teardown" );
        this.context.release( 'currentAssessment' );
        this.context.release( 'currentComparison' );
        this.context.release( 'currentPhases' );
        this.context.release( 'currentRepresentations' );
        this.context.release( 'currentJudgements' );
        this.context.release( 'currentSeqs' );

        this.stopListening();

        this.comparison = undefined;
        this.memento = undefined;
        this.context = undefined;
        this.eventData = undefined;
        this.eventName = undefined;
    },

    phaseDeselected : function( phase ){
        debug.debug( 'phaseDeselected' );
        this.logStop( phase.id );
    },

    phaseSelected : function( phase ){
        debug.debug( 'phaseSelected' );
        this.logStart( phase.id );
        this.comparison.set( {
            phase : phase.id
        } );
    },

    representationSelected : function( representation ){
        debug.debug( 'representationSelected' );
        this.comparison.set( 'selected', representation.id );
    },

    completed : function(){
        this.comparison.set( 'completed', true );
        this.teardown();
    },

    logStart : function( phase ){
        this.timelogger.start( {
            comparison : this.comparison.id,
            phase      : phase
        } );
    },

    logStop : function( phase ){
        this.timelogger.stop( {
            comparison : this.comparison.id,
            phase      : phase
        } );
    }
} );
