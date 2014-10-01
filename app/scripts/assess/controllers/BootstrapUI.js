'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
    debug( '#execute' );
    context.wireView( 'MainView', require( '../views/MainView' ), {
        'createAssessmentSelectionView' : 'AssessmentSelectionView',
        'createComparisonView': 'ComparisonView'
    } );
    context.wireView( 'AssessmentSelectionView', require( '../views/AssessmentSelectionView' ), {
        collection : "assessmentsCollection"
    } );
    context.wireView('JudgementView', require('../views/JudgementView'));
    context.wireView( 'ComparisonView', require( '../views/ComparisonView' ) );
};

