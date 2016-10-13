'use strict';
const debug = require( 'debug' )( 'dpac:core.controllers', '[UploadsModuleMediator]' );
const Base = require( './BaseModuleMediator' );
module.exports = Base.extend( {

    contextEvents: {
        "authentication:signout:completed": 'destroyModule'
    },

    initialize: function(){
        debug( "#initialize" );
        Base.prototype.initialize.call( this, {
            contentFactory: function(){
                require.ensure( [ '../../uploads/UploadsContext' ], ( require )=>{
                    this.prepareModule( require( '../../uploads/UploadsContext' ) );
                }, 'uploads' );
            },
            viewProxyName: 'uploadsViewProxy',
            onUiReadyEvent: 'uploads:bootstrap:completed',
            moduleToParentEvents: [
                "uploads:ui:destroyed",
                { "uploads:show:messages": "app:show:messages" }
            ],
            parentToModuleEvents: [
                "assessments:collection:sync",
                "authentication:signout:completed"
            ]

        } );

    },

} );

