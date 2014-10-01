'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapDomain]' );

var BootstrapModels = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapModels.prototype, {
    wiring : ['config'],

    execute : function(){
        debug( '#execute' );
        var context = this.context;

        context.wireValue( 'url.api.me.assessments', this.config.api.root + '/me/assessments' );
        context.wireSingleton( 'assessmentsCollection', require( '../collections/AssessmentsCollection' ), {
            url : 'url.api.me.assessments'
        } );

        //Yeah. I know. We _really_ have to rename Context#wireView, see https://github.com/GeppettoJS/backbone.geppetto/issues/77
        context.wireView( 'AggregateModel', require( '../models/AggregateModel' ), {
            assessments      : 'assessmentsCollection',
            phases           : 'phasesCollection',
            representations  : 'representationsCollection',
            judgements       : 'judgementsCollection',
            createComparison : 'ComparisonModel'
        } );
        context.wireValue( 'url.api.me.aggregates', this.config.api.root + '/me/aggregates' );
        context.wireSingleton( 'aggregatesCollection', require( '../collections/AggregatesCollection' ), {
            url   : 'url.api.me.aggregates',
            model : 'AggregateModel'
        } );

        context.wireView( 'ComparisonModel', require( '../models/ComparisonModel' ) );
        context.wireClass( 'phasesCollection', require( '../collections/PhasesCollection' ) );
        context.wireClass( 'representationsCollection', require( '../collections/RepresentationsCollection' ) );
        context.wireClass( 'judgementsCollection', require( '../collections/JudgementsCollection' ) );

        context.wireSingleton( 'comparisonFlow', require( '../controllers/ComparisonFlow' ) ).getObject( 'comparisonFlow' );

    }
} );
