'use strict';
var _ = require( 'underscore' );
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:assess.models', '[CurrentSelectionModel]' );

var teardown = require( '../mixins/teardown' );

module.exports = Backbone.Model.extend( {
    defaults: {
        comparison: undefined,
        assessment: undefined,
        representations: undefined,
        phases: undefined,
        completed: false
    },

    initialize: function( attrs ){
        debug( '#initialize' );
        var currentPhaseId = attrs.comparison.get( 'phase' );
        var index;
        if( currentPhaseId ){
            var assessmentPhases = attrs.assessment.get( 'phases' );
            index = assessmentPhases.indexOf( currentPhaseId );
            if(index<0){
                index=0;
            }
        }else{
            index=0;
        }
        currentPhaseId = assessmentPhases[index];
        this.set( 'currentPhase', attrs.phases.get( currentPhaseId ) );
    },

    getRepresentation: function( orderId ){
        var repId = this.get( "comparison" ).get( "representations" )[ orderId ];
        return this.get( "representations" ).get( repId );
    },

    storeDataForCurrentPhase: function( value ){
        var comparison = this.get( 'comparison' );
        var update = {
            data: comparison.get( 'data' ) || {},
            phase: this.get( "assessment" ).getNextPhaseId( this.get( 'currentPhase' ).id )
        };
        update.data[ this.get( 'currentPhase' ).get( 'slug' ) ] = value;
        if( !update.phase ){
            update.completed = true;
            update.phase = null;
            comparison.update( update );
            this.set('completed', true);
        } else {
            comparison.update( update );
            this.set( 'currentPhase', this.get( 'phases' ).get( update.phase ) );
        }
    }
} );
