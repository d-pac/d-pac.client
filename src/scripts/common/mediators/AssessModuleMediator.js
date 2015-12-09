'use strict';
var _ = require( 'underscore' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[AssessModuleMediator]' );
var ModuleContext = require( '../../assess/AssessContext' );
var relayEvents = require( '../mixins/relayEvents' );
var Base = require('./BaseModuleMediator');
module.exports = Base.extend( {

    initialize: function(){
        debug.log( "#initialize" );
        Base.prototype.initialize.call( this, {
            ModuleContext: ModuleContext,
            viewProxyName: 'assessmentViewProxy',
            onUiReadyEvent: 'assess:bootstrap:completed',
            moduleToParentEvents: [
                        "assess:ui:destroyed",
                        "assess:teardown:requested",
                        [ "assess:show:messages", "app:show:messages" ]
                    ],
            parentToModuleEvents: [
                        "assessments:collection:sync"
                    ]

        } )

    },

} );

relayEvents.mixin( module.exports );
