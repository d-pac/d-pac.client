'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:uploads.controllers', '[BootstrapModule]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapModule(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;
        var assessmentsFacade = context.getObject( 'assessmentsFacade' );
        //
        // context.wireCommands( {
        //     'results:bootstrap:requested': [ require( './BootstrapDomain' ) ],
        //     'results:ui:requested': [
        //         require( './BootstrapUI' )
        //     ],
        //     'results:assessment:selected': [ require( './LoadRepresentations' ) ],
        //     "results:representation:selected": [ require( './LoadFeedback' ) ]
        // } );
        //
        // instruct( this.context.vent )
        //     .when( 'results:bootstrap:requested' ).then( function(){
        //         assessmentsFacade.fetch();
        //     } )
        //     .when( 'assessments:collection:sync' ).then( function(){
        //         context.wireValue( 'assessmentsCollection', assessmentsFacade );
        //     }, 'results:ui:requested', 'results:bootstrap:completed' )
        //     .when( 'results:assessment:selected' ).then( function(){
        //         var collection = context.getObject( 'representationsCollection' );
        //         collection.deselect();
        //     } );

        //set off bootstrapping
        context.vent.trigger( 'uploads:bootstrap:requested' );
    }
} );
