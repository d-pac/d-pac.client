'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:results.controllers', '[BootstrapModule]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapModule(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;
        var assessmentsFacade = context.getObject( 'assessmentsFacade' );

        context.wireCommands( {
            'results:bootstrap:requested': [ require( './BootstrapDomain' ) ],
            'results:ui:requested': [
                require( './BootstrapUI' )
            ],
            'results:assessment:selected': [ require( './LoadRepresentations' ) ],
            "results:representation:selected": [ require( './LoadFeedback' ) ]
        } );

        var instructor = instruct( this.context.vent );
        instructor
            .when( 'results:bootstrap:requested' )
            .then( function(){
                assessmentsFacade.fetch();
            } )
            .when( 'assessments:collection:sync' )
            .then( function(){
                context.wireValue( 'assessmentsCollection', assessmentsFacade );
            }, 'results:ui:requested', 'results:bootstrap:completed' )
            .when( 'results:bootstrap:completed' )
            .then( function(){
                instructor.destroy();
            } );

        //set off bootstrapping
        context.vent.trigger( 'results:bootstrap:requested' );
    }
} );
