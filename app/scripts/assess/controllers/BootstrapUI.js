'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
    debug( '#execute' );
    context.wireView( 'MainView', require( '../views/MainView' ), {
        'createAssessmentSelectionView' : 'AssessmentSelectionView',
        'createLayoutView': 'LayoutView'
    } );
    context.wireView( 'AssessmentSelectionView', require( '../views/AssessmentSelectionView' ), {
        collection : "assessmentsCollection"
    } );
    context.wireView( 'AssessmentDetailView', require( '../views/AssessmentDetailView' ), {
        model : "currentAssessment"
    } );
    context.wireView('WizardView', require('../views/WizardView'), {
        model : "currentPhases"
    });
    context.wireView( 'LayoutView', require( '../views/LayoutView' ), {
        detailFactory : "AssessmentDetailView",
        wizardFactory : "WizardView"
    } );
};

