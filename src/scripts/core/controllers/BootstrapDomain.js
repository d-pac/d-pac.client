'use strict';
const {extend} = require( 'lodash' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapDomain]' );
module.exports = function BootstrapDomain(){
    //constructor
};

extend( module.exports.prototype, {
    wiring: [ 'config' ],
    execute: function(){
        debug( '#execute' );
        var context = this.context;

        context.wireSingleton( 'assessmentsFacade', require( '../models/AssessmentsCollection' ) );

        context.wireSingleton( 'pendingRequests', require( '../models/PendingRequestsCollection' ) );
        context.getObject( 'pendingRequests' );

        context.wireSingleton( 'authenticationService', require( '../services/AuthenticationService' ) );
        context.getObject( 'authenticationService' );

        context.wireSingleton( 'pagesCollection', require( '../models/PagesCollection' ) );
        context.wireSingleton( 'accountModel', require( '../models/AccountProxy' ) );

        context.wireSingleton( 'authorizationModel', require( '../models/AuthorizationModel' ), {
            authentication: 'authenticationService',
            assessments: 'assessmentsFacade'
        } );

    }
} );


