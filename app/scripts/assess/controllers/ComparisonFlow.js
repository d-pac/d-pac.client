'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[ComparisonFlow]' );

module.exports = Marionette.Controller.extend( {
    contextEvents : {
        "assessment:ui:rendered"         : "requestAggregatesCollection",
        "assessment:selection:completed" : "assessmentSelectionReceived"
    },
    wiring        : ['assessmentContext', 'aggregatesCollection', 'assessmentsCollection'],

    initialize : function(){
        debug( '#initialize' );
        this.context = this.assessmentContext;
    },

    requestAggregatesCollection  : function(){
        debug( '#requestAggregatesCollection' );
        this.dispatch( "aggregates:collection:requested" );
        this.aggregatesCollection.once( "sync", this.aggregatesCollectionReceived, this );
        this.aggregatesCollection.fetch();
    },
    aggregatesCollectionReceived : function(){
        debug( "#aggregatesCollectionReceived" );
        if( !this.aggregatesCollection.hasActive() ){
            this.requestAssessmentSelection();
        }else{
            this.requestAggregateSelection();
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
        this.requestAggregateCreation( assessment );
    },

    requestAggregateCreation  : function( assessment ){
        debug( '#requestAggregateCreation' )
        this.dispatch( 'aggregates:creation:requested' );
        //todo: aggregate creation failure
        this.aggregatesCollection.once( "add", this.aggregateCreationReceived, this );
        this.aggregatesCollection.create( {
            assessment : assessment.id
        }, {wait:true} );
    },
    aggregateCreationReceived : function( aggregate ){
        debug( '#aggregateCreationReceived' );
        this.requestAggregateSelection( aggregate );
    },

    requestAggregateSelection  : function(){
        debug( '#requestAggregateSelection' );
        this.dispatch( 'aggregates:selection:requested' );
        //we're going to handle it here for the time being
        //since ATM a single active aggregate is allowed anyway
        var model = this.aggregatesCollection.getActive();
        model.select();
        this.aggregateSelectionReceived( model );
    },
    aggregateSelectionReceived : function( aggregate ){
        debug( '#aggregateSelectionReceived' );
        this.setupAggregateWirings( aggregate );
    },

    setupAggregateWirings : function( aggregate ){
        debug( '#setupAggregateWirings' );
        this.context.wireValue( 'currentAssessment', aggregate.assessment );
        this.context.wireValue( 'currentJudgements', aggregate.judgements );
        this.context.wireValue( 'currentPhases', aggregate.phases );
        this.requestAggregateEditing(aggregate);
    },

    requestAggregateEditing : function( aggregate ){
        debug( '#requestAggregateEditing' );
        this.dispatch( 'aggregates:editing:requested', {
            aggregate : aggregate
        } );
    }
} );
