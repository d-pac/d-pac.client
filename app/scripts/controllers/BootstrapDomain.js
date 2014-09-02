'use strict';
var debug = require( 'bows' )( 'dpac:commands' );
var UserModel = require( '../models/UserModel' );
var AuthService = require( '../services/AuthService' );
var AssessmentsCollection = require( '../collections/AssessmentsCollection' );
var ComparisonFlowController = require( './ComparisonFlowController' );
var AggregateComparisonModel = require('../models/AggregateComparisonModel');

var BootstrapModels = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapModels.prototype, {
    wiring : ['config'],

    execute : function(){
        debug.log( 'BootstrapDomain#execute' );
        this.context.wireValue( 'url.api.me.account', this.config.api.root + '/me/account' );
        this.context.wireSingleton( 'accountModel', UserModel, {
            url : 'url.api.me.account'
        } );

        this.context.wireValue( 'url.api.me.assessments', this.config.api.root + '/me/assessments' );
        this.context.wireSingleton( 'userAssessments', AssessmentsCollection, {
            url : 'url.api.me.assessments'
        } );

        this.context.wireValue( 'url.api.me.comparison', this.config.api.root + '/me/comparison');
        this.context.wireSingleton( 'currentComparison', AggregateComparisonModel, {
            url : 'url.api.me.comparison'
        });

        this.context.wireValue( 'url.api.me.session', this.config.api.root + '/me/session');
        this.context.wireSingleton( 'authService', AuthService, {
            url : 'url.api.me.session'
        } );

        this.context.wireCommands( {
            'route:signout:completed' : require( './Signout' )
        } );

        this.context.wireSingleton( 'comparisonFlowController', ComparisonFlowController );
        Backbone.Geppetto.bindContext( {
            view : this.context.getObject( 'comparisonFlowController' ),
            context : this.context
        });
    }
} );
