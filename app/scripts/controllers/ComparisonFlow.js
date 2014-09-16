'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );

module.exports = Marionette.Controller.extend( {
    contextEvents : {
        "route:assess:completed"         : "requestComparisonsCollection",
        "assessment:selection:completed" : "assessmentSelectionReceived"
    },
    wiring        : ['comparisonsCollection', 'assessmentsCollection'],

    initialize : function(){
        debug( 'ComparisonFlow#initialize' );
    },

    requestComparisonsCollection  : function(){
        debug( 'ComparisonFlow#requestComparisonsCollection' );
        this.dispatch( "comparisons:collection:requested" );
        this.comparisonsCollection.once( "sync", this.comparisonsCollectionReceived, this );
        this.comparisonsCollection.fetch();
    },
    comparisonsCollectionReceived : function(){
        console.log( "ComparisonFlow#comparisonStatusReceived" );
        //todo: throw error when length > 1
        if( this.comparisonsCollection.length <= 0 ){
            this.requestAssessmentSelection();
        }else{
            this.requestComparisonEditing( this.comparisonsCollection.at( 0 ) );
        }
    },

    requestAssessmentSelection  : function(){
        this.dispatch( 'assessments:selection:requested' );
        this.assessmentsCollection.fetch();
    },
    assessmentSelectionReceived : function( payload ){
        this.requestComparisonCreation( payload.assessment );
    },

    requestComparisonCreation  : function( assessment ){
        this.dispatch( 'comparisons:creation:requested' );
        //todo: comparison creation failure
        this.comparisonsCollection.once( "add", this.comparisonCreationReceived, this );
        this.comparisonsCollection.create( {
            assessment : assessment
        } );
    },
    comparisonCreationReceived : function( comparison ){
        this.requestComparisonEditing( comparison );
    },

    requestComparisonEditing : function( comparison ){
        this.comparisonsCollection.select(comparison);
        this.dispatch( 'comparisons:editing:requested', {
            comparison : comparison
        } );
    }
} );
