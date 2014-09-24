'use strict';
var debug = require( 'debug' )( 'dpac:controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
    debug( '#execute' );
    context.wireView( 'MenuView', require( '../views/MenuView' ) );
    context.wireView( 'AccountView', require( '../views/AccountView' ), {
        model : "accountModel"
    } );
    context.wireView( 'LoginView', require( '../views/LoginView' ));
    context.wireView( 'AppView', require( '../views/AppView' ) );
    context.wireView( 'WelcomeView', require( '../views/WelcomeView' ) );
    context.wireView( 'NotFoundView', require( '../views/404View' ) );
    context.wireView( 'LoadingView', require( '../views/LoadingView' ) );
    context.wireView( 'AssessmentView', require( '../views/assessment/AssessmentView' ) );
    context.wireView( 'AssessmentSelectionView', require( '../views/assessment/AssessmentSelectionView' ), {
        collection : "assessmentsCollection"
    } );
    context.wireView('JudgementView', require('../views/assessment/Judgement'));
    context.wireView( 'ComparisonView', require( '../views/assessment/ComparisonView' ), {
        model : 'currentComparison',
        judgementFactory : 'JudgementView'
    } );

    var appView = context.getObject( 'AppView' )();
    appView.render();
};

