'use strict';
var debug = require( 'debug' )( 'dpac:controllers','[ComparisonFlow]' );

module.exports = Marionette.Controller.extend( {
    contextEvents : {
        "route:assess:completed"         : "requestAggregatesCollection",
        "assessment:selection:completed" : "assessmentSelectionReceived"
    },
    wiring        : ['context', 'aggregatesCollection', 'assessmentsCollection'],

    initialize : function(){
        debug( '#initialize' );
    },

    requestAggregatesCollection  : function(){
        debug( '#requestAggregatesCollection' );
        this.dispatch( "aggregates:collection:requested" );
        this.aggregatesCollection.once( "sync", this.aggregatesCollectionReceived, this );
        this.aggregatesCollection.fetch();
    },
    aggregatesCollectionReceived : function(){
        debug( "#aggregatesCollectionReceived" );
        //todo: throw error when length > 1
        if( this.aggregatesCollection.hasActive() ){
            this.requestAssessmentSelection();
        }else{
            this.requestAggregateEditing( this.aggregatesCollection.getActive() );
        }
    },

    requestAssessmentSelection  : function(){
        debug('#requestAssessmentSelection');
        this.dispatch( 'assessments:selection:requested' );
        this.assessmentsCollection.once("select:one", this.assessmentSelectionReceived, this);
        this.assessmentsCollection.fetch();
    },
    assessmentSelectionReceived : function( payload ){
        debug('#assessmentSelectionReceived')
        this.requestAggregateCreation( payload.assessment );
    },

    requestAggregateCreation  : function( assessment ){
        debug('#requestAggregateCreation')
        this.dispatch( 'aggregates:creation:requested' );
        //todo: aggregate creation failure
        this.aggregatesCollection.once( "add", this.aggregateCreationReceived, this );
        this.aggregatesCollection.create( {
            assessment : assessment
        } );
    },
    aggregateCreationReceived : function( aggregate ){
        debug('#aggregateCreationReceived');
        this.requestAggregateEditing( aggregate );
    },

    requestAggregateEditing : function( aggregate ){
        debug('#requestAggregateEditing');
        if(this.context.hasWiring('currentAggregate')){
            this.context.release('currentAggregate');
        }
        this.context.wireValue('currentAggregate', aggregate);
        this.dispatch( 'aggregates:editing:requested', {
            aggregate : aggregate
        } );
    }
} );
