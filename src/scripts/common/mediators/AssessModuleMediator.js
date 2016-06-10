'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[AssessModuleMediator]' );
var Base = require( './BaseModuleMediator' );
module.exports = Base.extend( {

    contextEvents: {
        "authentication:signout:completed": 'destroyModule'
    },

    initialize: function(){
        debug( "#initialize" );
        Base.prototype.initialize.call( this, {
            contentFactory: function(){
                require.ensure( [ '../../assess/AssessContext' ], function( require ){
                    this.prepareModule( require( '../../assess/AssessContext' ) );
                }.bind( this ), 'assess' );
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
