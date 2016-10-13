'use strict';
const debug = require( 'debug' )( 'dpac:core.controllers', '[AssessModuleMediator]' );
const Base = require( './BaseModuleMediator' );
module.exports = Base.extend( {

    contextEvents: {
        "authentication:signout:completed": 'destroyModule'
    },

    initialize: function(){
        debug( "#initialize" );
        Base.prototype.initialize.call( this, {
            contentFactory: function(){
                require.ensure( [ '../../assess/AssessContext' ], ( require )=>{
                    this.prepareModule( require( '../../assess/AssessContext' ) );
                }, 'assess' );
            },
            viewProxyName: 'assessmentViewProxy',
            onUiReadyEvent: 'assess:bootstrap:completed',
            moduleToParentEvents: [
                "assess:ui:destroyed",
                { "assess:show:messages": "app:show:messages" }
            ],
            parentToModuleEvents: [
                "assessments:collection:sync",
                "authentication:signout:completed"
            ]

        } );

    },

} );
