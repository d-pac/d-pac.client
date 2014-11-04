'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[AssessmentFlow]' );

module.exports = Marionette.Controller.extend( {

    contextEvents : {
        "assessment:ui:rendered"         : "requestMementosCollection",
        "assessment:selection:completed" : "assessmentSelectionCompleted",
        "mementos:selection:completed"   : "requestMementoEditing",
        "mementos:editing:completed"     : "mementoEditingCompleted"
    },
    wiring        : ['assessmentContext', 'mementosCollection', 'assessmentsCollection'],

    initialize : function(){
        debug( '#initialize' );
        this.context = this.assessmentContext;
    },

    teardown : function(){
        debug("#teardown");
        this.assessmentContext = undefined;
        this.mementosCollection = undefined;
        this.assessmentsCollection = undefined;
        this.stopListening();
        this.context = undefined;
        this.eventData = undefined;
        this.eventName = undefined;
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

    requestAssessmentSelection  : function(allCompleted){
        debug( '#requestAssessmentSelection' );
        this.assessmentsCollection.resync();
        this.dispatch( 'assessments:selection:requested', {
            allCompleted : allCompleted
        } );
        this.assessmentsCollection.once( "select:one", this.assessmentSelectionCompleted, this );
    },
    assessmentSelectionCompleted : function( ){
        debug( '#assessmentSelectionCompleted' );
        this.requestMementoCreation();
    },

    requestMementoCreation  : function(  ){
        debug( '#requestMementoCreation' );
        var assessment = this.assessmentsCollection.selected;
        debug.debug('assessment', assessment);

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
        this.dispatch( 'mementos:selection:completed', {
            memento : memento
        } );
    },

    requestMementoEditing   : function( memento ){
        debug( '#requestMementoEditing' );
        this.dispatch( 'mementos:editing:requested', {
            memento : memento
        } );
    },
    mementoEditingCompleted : function(){
        debug( '#mementoEditingCompleted' );
        this.requestMementosCollection();
    }
} );
