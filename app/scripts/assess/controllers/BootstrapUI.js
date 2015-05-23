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
            //selectFactory: "SelectionView",
            //seqFactory: "seqViewFactory",
            //compareFactory: "ComparativeView",
            //passfailFactory: "PassFailView",
            //savingFactory: "SavingView"
        } );
        context.wireView( 'LayoutView', require( '../views/LayoutView' ), {
            //detailFactory: "AssessmentDetailView",
            phasesFactory: "PhasesView",
            representationsFactory: "RepresentationsView",
            //judgementsFactory: "JudgementsView",
            assessmentDetailsFactory: "AssessmentDetails"
        } );
        //context.wireView( 'SelectionView', require( '../views/SelectionView' ), {
        //    collection: 'currentRepresentations'
        //} );
        //context.wireView( 'seqViewFactory', require( '../views/factories/SeqViewFactory' ) );
        //context.wireView( 'SeqView', require( '../views/SeqView' ) );
        //context.wireView( 'ComparativeView', require( '../views/ComparativeView' ), {
        //    model: 'currentComparison'
        //} );
        //context.wireView( 'PassFailView', require( '../views/PassFailView' ), {
        //    collection: 'currentJudgements'
        //} );

        //context.wireView( 'RepresentationDetailView', require( '../views/RepresentationDetailView' ), {
        //    host: 'host'
        //} );
        context.wireView( 'RepresentationsView', require( '../views/RepresentationsView' ), {
            model: "currentSelection"
        } );
        //context.wireView( 'JudgementDetailView', require( '../views/JudgementDetailView' ) );
        //context.wireView( 'JudgementsView', require( '../views/JudgementsView' ), {
        //    collection: "currentJudgements",
        //    childView: "JudgementDetailView"
        //} );
        context.wireView( 'AssessmentDetails', require( '../views/AssessmentDetails' ), {
            model: "currentSelection"
        } );
        //context.wireView( "SavingView", require( '../views/SavingView' ) );

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
