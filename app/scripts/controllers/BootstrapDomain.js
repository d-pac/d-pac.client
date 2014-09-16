'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );

var BootstrapModels = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapModels.prototype, {
    wiring : ['config'],

    execute : function(){
        debug.log( 'BootstrapDomain#execute' );
        this.context.wireValue( 'url.api.me.account', this.config.api.root + '/me/account' );
        this.context.wireSingleton( 'accountModel', require( '../models/UserModel' ), {
            url : 'url.api.me.account'
        } );

        this.context.wireValue( 'url.api.me.assessments', this.config.api.root + '/me/assessments' );
        this.context.wireSingleton( 'assessmentsCollection', require( '../collections/AssessmentsCollection' ), {
            url : 'url.api.me.assessments'
        } );

        this.context.wireValue( 'url.api.me.comparisons', this.config.api.root + '/me/comparisons' );
        this.context.wireSingleton( 'comparisonsCollection', require( '../collections/ComparisonsCollection' ), {
            url : 'url.api.me.comparisons'
        } );

        this.context.wireValue( 'url.api.me.session', this.config.api.root + '/me/session' );
        this.context.wireSingleton( 'authService', require( '../services/AuthService' ), {
            url : 'url.api.me.session'
        } );

        this.context.wireSingleton('comparisonFlow', require('../controllers/ComparisonFlow')).getObject('comparisonFlow');

        this.context.wireCommands( {
            'route:signout:completed' : require( './Signout' )
        } );

    }
} );
