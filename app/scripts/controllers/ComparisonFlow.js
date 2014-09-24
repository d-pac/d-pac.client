'use strict';
var debug = require( 'debug' )( 'dpac:controllers','[ComparisonFlow]' );

module.exports = Marionette.Controller.extend( {
    contextEvents : {
        "route:assess:completed"         : "requestComparisonsCollection",
        "assessment:selection:completed" : "assessmentSelectionReceived"
    },
    wiring        : ['context', 'comparisonsCollection', 'assessmentsCollection'],

    initialize : function(){
        debug( '#initialize' );
    },

    requestComparisonsCollection  : function(){
        debug( '#requestComparisonsCollection' );
        this.dispatch( "comparisons:collection:requested" );
        this.comparisonsCollection.once( "sync", this.comparisonsCollectionReceived, this );
        this.comparisonsCollection.fetch();
    },
    comparisonsCollectionReceived : function(){
        debug( "#comparisonStatusReceived" );
        //todo: throw error when length > 1
        if( this.comparisonsCollection.length <= 0 ){
            this.requestAssessmentSelection();
        }else{
            this.requestComparisonEditing( this.comparisonsCollection.at( 0 ) );
        }
    },

    requestAssessmentSelection  : function(){
        debug('#requestAssessmentSelection');
        this.dispatch( 'assessments:selection:requested' );
        this.assessmentsCollection.fetch();
    },
    assessmentSelectionReceived : function( payload ){
        debug('#assessmentSelectionReceived')
        this.requestComparisonCreation( payload.assessment );
    },

    requestComparisonCreation  : function( assessment ){
        debug('#requestComparisonCreation')
        this.dispatch( 'comparisons:creation:requested' );
        //todo: comparison creation failure
        this.comparisonsCollection.once( "add", this.comparisonCreationReceived, this );
        this.comparisonsCollection.create( {
            assessment : assessment
        } );
    },
    comparisonCreationReceived : function( comparison ){
        debug('#comparisonCreationReceived');
        this.requestComparisonEditing( comparison );
    },

    requestComparisonEditing : function( comparison ){
        debug('#requestComparisonEditing');
        if(this.context.hasWiring('currentComparison')){
            this.context.release('currentComparison');
        }
        this.context.wireValue('currentComparison', comparison);
        this.dispatch( 'comparisons:editing:requested', {
            comparison : comparison
        } );
    }
} );
