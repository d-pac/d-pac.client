'use strict';

const {extend} = require('lodash');

const debug = require('debug')('dpac:results.controllers', '[BootstrapUI]');

const BootstrapUI = module.exports = function BootstrapUI(context) {
    // constructor
};

extend(BootstrapUI.prototype, {

    execute: function () {
        debug('#execute');

        const context = this.context;
        context.wireView('MainView', require('../views/MainView'), {
            createAssessmentSelection: 'AssessmentSelectionView',
            createAssessmentMenu: 'AssessmentMenuView',
            createAssessmentOverview: 'AssessmentOverview',
            createPage: 'PageNavigation'
        });

        context.wireView('PageNavigation', require('../views/PageNavigation'), {
            createRanking: 'RankingMain',
            createRepresentationsList: 'RepresentationsList',
            createAssessorsList: 'AssessorsList',
            createOverview:  'AssessmentOverview',
            model: 'resultsVM',
            config: 'config'
        });

        context.wireView('RankingMain', require('../views/RankingMain'), {
            createRanking: 'RankingGraph',
            createDetails: 'RankingDetails',
            createFeedback: 'RankingFeedback',
            authorization: 'authorizationModel',
            model: 'resultsVM'
        });

        context.wireView('AssessmentSelectionView', require('../views/AssessmentSelection'), {
            collection: 'assessmentsVM'
        });
        context.wireView('AssessmentMenuView', require('../views/AssessmentMenu'), {
            collection: 'assessmentsVM'
        });
        context.wireView('AssessmentOverview', require('../views/AssessmentOverview'), {
            model: 'resultsVM'
        });
        context.wireView('RankingGraph', require('../views/RankingGraph'), {
            model: 'resultsVM'
        });
        context.wireView('RankingDetails', require('../views/RankingDetails'), {
            collection: 'representationsCollection',
            mediaViewFactory: 'mediaViewFactory'
        });
        context.wireView('RankingFeedback', require('../views/RankingFeedback'), {
            representations: 'representationsCollection',
            collection: 'feedbackCollection'
        });

        context.wireView('RepresentationsList', require('../views/RepresentationsList'), {
            model: 'resultsVM'
        });
        context.wireView('AssessorsList', require('../views/AssessorsList'), {
            model: 'resultsVM'
        });

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
});
