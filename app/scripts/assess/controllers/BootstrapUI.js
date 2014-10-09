'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
};

_.extend( BootstrapUI.prototype, {

    execute : function(){
        debug( '#execute' );


        var context = this.context;
        context.wireView( 'MainView', require( '../views/MainView' ), {
            'createAssessmentSelectionView' : 'AssessmentSelectionView',
            'createLayoutView'              : 'LayoutView'
        } );
        context.wireView( 'AssessmentSelectionView', require( '../views/AssessmentSelectionView' ), {
            collection : "assessmentsCollection"
        } );
        context.wireView( 'AssessmentDetailView', require( '../views/AssessmentDetailView' ), {
            model : "currentAssessment"
        } );
        context.wireView( 'WizardView', require( '../views/WizardView' ), {
            collection            : "currentPhases",
            selectFactory : "SelectionView",
            seqFactory       : "seqViewFactory",
            compareFactory : "ComparativeView",
            passfailFactory: "PassFailView"
        } );
        context.wireView( 'LayoutView', require( '../views/LayoutView' ), {
            detailFactory          : "AssessmentDetailView",
            wizardFactory          : "WizardView",
            representationsFactory : "RepresentationsView"
        } );
        context.wireView( 'SelectionView', require( '../views/SelectionView' ), {
            collection : 'currentRepresentations'
        } );
        context.wireView('seqViewFactory', require('../views/factories/SeqViewFactory'));
        context.wireView( 'SeqView', require( '../views/SeqView' ) );
        context.wireView( 'ComparativeView', require( '../views/ComparativeView' ), {
            model : 'currentComparison'
        } );
        context.wireView( 'PassFailView', require( '../views/PassFailView' ), {
            collection : 'currentJudgements'
        } );

        context.wireView( 'RepresentationDetailView', require( '../views/RepresentationDetailView' ), {
            host : 'host'
        });
        context.wireView( 'RepresentationsView', require( '../views/RepresentationsView' ), {
            collection : "currentRepresentations",
            childView  : "RepresentationDetailView"
        } );

    }
});
