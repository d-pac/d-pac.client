'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[ResultsModuleMediator]' );

var relayEvents = require( '../mixins/relayEvents' );

var Base = require( './BaseModuleMediator' );

module.exports = Base.extend( {
    initialize: function(){
        debug.log( "#initialize" );
        Base.prototype.initialize.call( this, {
            contentFactory: function(){
                require.ensure(['../../results/ResultsContext'], function(require){
                    this.prepareModule(require('../../results/ResultsContext'));
                }.bind(this), 'results');
            },
            viewProxyName: 'resultsViewProxy',
            onUiReadyEvent: 'results:bootstrap:completed',
            moduleToParentEvents: [
                "results:ui:destroyed",
                "results:teardown:requested",
                [ "results:show:messages", "app:show:messages" ]
            ],
            parentToModuleEvents: [
                "assessments:collection:sync"
            ]

        } )
    },
} );
relayEvents.mixin( module.exports );
