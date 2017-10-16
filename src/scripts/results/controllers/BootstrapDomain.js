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
        context.wireSingleton('assessmentsVM', require('../vm/AssessmentsVM'), {
            assessmentsCollection: 'assessmentsCollection',
            accountModel: 'accountModel'
        });
        context.wireSingleton( 'representationsCollection', require( '../../common/models/RepresentationsCollection' ) );
        context.wireSingleton( 'feedbackCollection', require( '../../common/models/FeedbackCollection' ) );
        context.wireSingleton( 'resultsVM', require( '../vm/ResultsVM' ), {
            representations: 'representationsCollection',
            authorization: 'authorizationModel',
            users: 'usersCollection',
            config: 'config'
        } );
        context.wireSingleton('usersCollection', require('../../common/models/UsersCollection'));

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
