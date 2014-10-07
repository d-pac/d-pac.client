'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[ComparisonFlow]' );

module.exports = Marionette.Controller.extend( {
    contextEvents : {
        "assessment:ui:rendered"         : "requestMementosCollection",
        "assessment:selection:completed" : "assessmentSelectionReceived"
    },
    wiring        : ['assessmentContext', 'mementosCollection', 'assessmentsCollection'],

    initialize : function(){
        debug( '#initialize' );
        this.context = this.assessmentContext;
    },

    requestMementosCollection  : function(){
        debug( '#requestMementosCollection' );
        this.dispatch( "mementos:collection:requested" );
        this.mementosCollection.once( "sync", this.mementosCollectionReceived, this );
        this.mementosCollection.fetch();
    },
    mementosCollectionReceived : function(){
        debug( "#mementosCollectionReceived" );
        if( !this.mementosCollection.hasActive() ){
            this.requestAssessmentSelection();
        }else{
            this.requestMementoSelection();
        }
    },

    requestAssessmentSelection  : function(){
        debug( '#requestAssessmentSelection' );
        this.dispatch( 'assessments:selection:requested' );
        this.assessmentsCollection.once( "select:one", this.assessmentSelectionReceived, this );
        this.assessmentsCollection.fetch();
    },
    assessmentSelectionReceived : function( assessment ){
        debug( '#assessmentSelectionReceived', assessment );
        this.requestMementoCreation( assessment );
    },

    requestMementoCreation  : function( assessment ){
        debug( '#requestMementoCreation' )
        this.dispatch( 'mementos:creation:requested' );
        //todo: memento creation failure
        this.mementosCollection.once( "add", this.mementoCreationReceived, this );
        this.mementosCollection.create( {
            assessment : assessment.id
        }, { wait : true } );
    },
    mementoCreationReceived : function( memento ){
        debug( '#mementoCreationReceived' );
        this.requestMementoSelection( memento );
    },

    requestMementoSelection  : function(){
        debug( '#requestMementoSelection' );
        this.dispatch( 'mementos:selection:requested' );
        //we're going to handle it here for the time being
        //since ATM a single active memento is allowed anyway
        var model = this.mementosCollection.getActive();
        model.select();
        this.mementoSelectionReceived( model );
    },
    mementoSelectionReceived : function( memento ){
        debug( '#mementoSelectionReceived' );
        this.setupMementoWirings( memento );
    },

    setupMementoWirings : function( memento ){
        debug( '#setupMementoWirings' );
        this.context.wireValue( 'currentComparison', memento.comparison );
        this.context.wireValue( 'currentAssessment', memento.assessment );
        this.context.wireValue( 'currentJudgements', memento.judgements );
        this.context.wireValue( 'currentPhases', memento.phases );
        this.context.wireValue( 'currentRepresentations', memento.representations );
        this.requestMementoEditing( memento );
    },

    requestMementoEditing : function( memento ){
        debug( '#requestMementoEditing' );
        this.dispatch( 'mementos:editing:requested', {
            memento : memento
        } );
    }
} );
