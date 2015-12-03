'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:results.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
};

_.extend( BootstrapUI.prototype, {

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireView( 'MainView', require( '../views/MainView' ), {
            showAssessmentSelection: 'AssessmentSelectionView',
            showAssessmentMenu: 'AssessmentMenuView',
            showAssessmentOverview: 'AssessmentOverview',
            showRanking:'RepresentationsRankingView'
        } );
        context.wireView( 'AssessmentSelectionView', require( '../views/AssessmentSelection' ), {
            collection: 'assessmentsCollection'
        } );
        context.wireView( 'AssessmentMenuView', require( '../views/AssessmentMenu' ), {
            collection: 'assessmentsCollection'
        } );
        context.wireView( 'AssessmentOverview', require( '../views/AssessmentOverview' ), {
            collection: 'assessmentsCollection'
        } );
        context.wireView('RepresentationsRankingView', require('../views/RepresentationsRanking'), {
            collection: 'representationsCollection',
            assessments: 'assessmentsCollection'
        });

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
