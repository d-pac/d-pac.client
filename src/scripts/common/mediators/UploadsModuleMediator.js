'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[UploadsModuleMediator]' );
var Base = require( './BaseModuleMediator' );
module.exports = Base.extend( {

    contextEvents: {
        "authentication:signout:completed": 'destroyModule'
    },

    initialize: function(){
        debug.log( "#initialize" );
        Base.prototype.initialize.call( this, {
            contentFactory: function(){
                require.ensure( [ '../../uploads/UploadsContext' ], function( require ){
                    this.prepareModule( require( '../../uploads/UploadsContext' ) );
                }.bind( this ), 'uploads' );
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

        } )

    },

} );

