'use strict';

const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:results.controllers', '[BootstrapDomain]' );

const BootstrapDomain = module.exports = function BootstrapDomain( context ){
    // constructor
};

extend( BootstrapDomain.prototype, {

    execute: function(){
        debug( '#execute' );

        const context = this.context;
        context.wireSingleton( 'representationsCollection', require( '../../common/models/RepresentationsCollection' ) );
        context.wireSingleton( 'feedbackCollection', require( '../../common/models/FeedbackCollection' ) );
        context.wireSingleton( 'representationsRankingsController', require( './RepresentationsRankingController' ), {
            representations: 'representationsCollection',
            assessments: 'assessmentsCollection',
            authorization: 'authorizationModel'
        } );
        context.wireSingleton('statsController', require('./StatsController'));

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
