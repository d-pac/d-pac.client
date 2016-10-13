'use strict';
const debug = require( 'debug' )( 'dpac:core.controllers', '[ResultsModuleMediator]' );

const Base = require( './BaseModuleMediator' );

module.exports = Base.extend( {
    contextEvents: {
        "authentication:signout:completed": 'destroyModule'
    },

    initialize: function(){
        debug( "#initialize" );
        Base.prototype.initialize.call( this, {
            contentFactory: function(){
                require.ensure(['../../results/ResultsContext'], (require)=>{
                    this.prepareModule(require('../../results/ResultsContext'));
                }, 'results');
            },
            viewProxyName: 'resultsViewProxy',
            onUiReadyEvent: 'results:bootstrap:completed',
            moduleToParentEvents: [
                "results:ui:destroyed",
                "results:teardown:requested",
                { "results:show:messages": "app:show:messages" }
            ],
            parentToModuleEvents: [
                "assessments:collection:sync"
            ]

        } );
    },
} );
