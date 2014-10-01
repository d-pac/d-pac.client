'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
    debug( '#execute' );
    context.wireView( 'MainView', require( '../views/MainView' ), {
        'createAssessmentSelectionView' : 'AssessmentSelectionView',
        'createAggregateView': 'AggregateView'
    } );
    context.wireView( 'AssessmentSelectionView', require( '../views/AssessmentSelectionView' ), {
        collection : "assessmentsCollection"
    } );
    context.wireView('JudgementView', require('../views/JudgementView'));
    context.wireView( 'AggregateView', require( '../views/AggregateView' ) );
};

