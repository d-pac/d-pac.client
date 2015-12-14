'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[AssessModuleMediator]' );
var relayEvents = require( '../mixins/relayEvents' );
var Base = require('./BaseModuleMediator');
module.exports = Base.extend( {

    initialize: function(){
        debug.log( "#initialize" );
        Base.prototype.initialize.call( this, {
            contentFactory: function(){
                require.ensure(['../../assess/AssessContext'], function(require){
                    this.prepareModule(require('../../assess/AssessContext'));
                }.bind(this), 'assess');
            },
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
