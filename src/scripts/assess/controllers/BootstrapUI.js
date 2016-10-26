'use strict';

const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapUI]' );

const BootstrapUI = module.exports = function BootstrapUI( context ){
    //constructor
};

extend( BootstrapUI.prototype, {

    execute: function(){
        debug( '#execute' );

        const context = this.context;
        context.wireView( 'MainView', require( '../views/MainView' ), {
            'assessmentSelectionFactory': 'AssessmentSelectionView',
            'layoutFactory': 'ComparisonLayout',
            'continueComparisonsFactory': 'ContinueComparisonsView',
            'comparisonMessagesFactory': 'ComparisonMessagesView'
        } );
        context.wireView( 'ComparisonMessagesView', require( '../views/ComparisonMessages' ));
        context.wireView( 'ContinueComparisonsView', require( '../views/ContinueComparisons' ),{
            collection: 'assessmentsCollection'
        });
        context.wireView( 'AssessmentSelectionView', require( '../views/AssessmentSelection' ), {
            collection: "assessmentsCollection"
        } );
        context.wireView( 'PhasesView', require( '../views/PhasesView' ), {
            model: "currentSelection"
        } );
        context.wireView( 'ComparisonLayout', require( '../views/ComparisonLayout' ), {
            phasesFactory: "PhasesView",
            representationsFactory: "RepresentationsView",
            assessmentDetailsFactory: "AssessmentDetails"
        } );
        context.wireView( 'RepresentationsView', require( '../views/RepresentationsView' ), {
            model: "currentSelection",
            createRepresentationDetail: 'RepresentationDetail'
        } );
        context.wireView('RepresentationDetail', require( '../views/RepresentationDetailView' ), {
            mediaViewFactory: 'mediaViewFactory'
        } );
        context.wireView( 'AssessmentDetails', require( '../views/AssessmentDetails' ), {
            model: "currentSelection"
        } );
        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
