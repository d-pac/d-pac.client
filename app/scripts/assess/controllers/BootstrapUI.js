'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
};

_.extend( BootstrapUI.prototype, {

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireView( 'MainView', require( '../views/MainView' ), {
            'assessmentSelectionFactory': 'AssessmentSelectionView',
            'layoutFactory': 'LayoutView',
            'comparisonsContinuationFactory': 'ComparisonsContinuationView'
        } );
        context.wireView( 'ComparisonsContinuationView', require( '../views/ComparisonsContinuation' ), {
            collection:"comparisonsCollection"
        } );
        context.wireView( 'AssessmentSelectionView', require( '../views/AssessmentSelectionView' ), {
            collection: "assessmentsCollection"
        } );
        context.wireView( 'PhasesView', require( '../views/PhasesView' ), {
            model: "currentSelection"
        } );
        context.wireView( 'LayoutView', require( '../views/LayoutView' ), {
            phasesFactory: "PhasesView",
            representationsFactory: "RepresentationsView",
            assessmentDetailsFactory: "AssessmentDetails"
        } );
        context.wireView( 'RepresentationsView', require( '../views/RepresentationsView' ), {
            model: "currentSelection"
        } );
        context.wireView( 'AssessmentDetails', require( '../views/AssessmentDetails' ), {
            model: "currentSelection"
        } );
        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
