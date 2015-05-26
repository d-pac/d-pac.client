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
        selectedRepresentation: undefined,
        completed: false
    },

    initialize: function( attrs ){
        debug( '#initialize', attrs );
        var currentPhaseId = attrs.comparison.get( 'phase' );
        var assessmentPhases = attrs.assessment.get( 'phases' );
        var index;
        if( currentPhaseId ){
            index = assessmentPhases.indexOf( currentPhaseId );
            if( index < 0 ){
                index = 0;
            }
        } else {
            index = 0;
        }
        currentPhaseId = assessmentPhases[ index ];
        this.set( 'currentPhase', attrs.phases.get( currentPhaseId ) );
        var selectedRepId = attrs.comparison.get( 'data' ).selection;
        if( selectedRepId ){
            this.set( 'selectedRepresentation', attrs.representations.get( selectedRepId ) );
        }
    },

    getRepresentationByOrder: function( orderId ){
        var repId = this.get( "comparison" ).get( "representations" )[ orderId ];
        return this.get( "representations" ).get( repId );
    },

    getSelectedRepresentationOrder: function(){
        var selectedRep = this.get( 'selectedRepresentation' );
        if( selectedRep ){
            var found;
            _.find( this.get( 'comparison' ).get( 'representations' ), function( representationId,
                                                                                 order ){
                if( representationId === selectedRep.id ){
                    found = order;
                    return true;
                }
            } );
            return found;
        }
        return false;
    },

    storeDataForCurrentPhase: function( value ){
        var comparison = this.get( 'comparison' );
        var currentPhase = this.get( 'currentPhase' );
        if( currentPhase.get('slug') === "selection" ){
            this.set( 'selectedRepresentation', this.get( 'representations' ).get( value ) );
        }
        var update = {
            data: comparison.get( 'data' ) || {},
            phase: this.get( "assessment" ).getNextPhaseId( currentPhase.id )
        };
        update.data[ this.get( 'currentPhase' ).get( 'slug' ) ] = value;
        if( !update.phase ){
            update.completed = true;
            update.phase = null;
            comparison.update( update );
            this.set( 'completed', true );
        } else {
            comparison.update( update );
            this.set( 'currentPhase', this.get( 'phases' ).get( update.phase ) );
        }
    }
} );
