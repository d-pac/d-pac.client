'use strict';

const {extend} = require( 'lodash' );

var debug = require( 'debug' )( 'dpac:results.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
    // constructor
};

extend( BootstrapUI.prototype, {

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireView( 'MainView', require( '../views/MainView' ), {
            createAssessmentSelection: 'AssessmentSelectionView',
            createAssessmentMenu: 'AssessmentMenuView',
            createAssessmentOverview: 'AssessmentOverview',
            createRanking: 'RepresentationsRankingView',
            createDetails: 'RepresentationDetailsView',
            createFeedback: 'FeedbackOverview',
            authorization: 'authorizationModel'
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
        context.wireView( 'RepresentationsRankingView', require( '../views/RepresentationsRanking' ), {
            model: 'representationsRankingsController'
        } );
        context.wireView( 'RepresentationDetailsView', require( '../views/RepresentationDetails' ), {
            collection: 'representationsCollection',
            mediaViewFactory: 'mediaViewFactory'
        } );
        context.wireView( 'FeedbackOverview', require( '../views/FeedbackOverview' ), {
            representations: 'representationsCollection',
            collection: 'feedbackCollection'
        } );

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
