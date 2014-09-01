'use strict';
var debug = require( 'bows' )( 'dpac:commands' );
var UserModel = require( '../models/UserModel' );
var AuthService = require( '../services/AuthService' );
var AssessmentsCollection = require( '../collections/AssessmentsCollection' );

var BootstrapModels = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapModels.prototype, {
    wiring : ['config'],

    execute : function(){
        debug.log( 'BootstrapDomain#execute' );
        this.context.wireValue( 'account.api.url', this.config.api.root + '/me/account' );
        this.context.wireSingleton( 'accountModel', UserModel, {
            url : 'account.api.url'
        } );

        this.context.wireValue( 'assessments.api.url', this.config.api.root + '/me/assessments' );
        this.context.wireSingleton( 'userAssessments', AssessmentsCollection, {
            url : 'assessments.api.url'
        } );

        this.context.wireSingleton( 'authService', AuthService );

        this.context.wireCommands( {
            'route:signout:completed' : require( './Signout' )
        } );
    }
} );
