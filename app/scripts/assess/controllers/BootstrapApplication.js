'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapApplication]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapApplication(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;
        context.wireCommands( {
            'assess:domain:requested': [ require( './BootstrapDomain' ) ]
        } );

        instruct( this.context.vent )
            .when( 'assess:bootstrap:requested' ).then( 'assess:domain:requested', function(){
                var collection = context.getObject( 'assessmentsCollection' );
                collection.once( "sync", function(){
                    context.dispatch( "assessments:collection:sync" );
                } );
                collection.fetch();
            } )
            .when( 'assessments:collection:sync' ).then( function(){
                var collection = context.getObject( 'comparisonsCollection' );
                collection.once( "sync", function(){
                    context.dispatch( "comparisons:collection:sync" );
                } );
                collection.fetch();
            } )
        ;

        //set off bootstrapping
        context.vent.trigger( 'assess:bootstrap:requested' );
    }
} );
