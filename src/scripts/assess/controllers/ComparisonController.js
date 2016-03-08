'use strict';
var _ = require( 'underscore' );
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:assess.models', '[CurrentSelectionModel]' );

module.exports = Backbone.Model.extend( {
    defaults: {
        comparisons: undefined,
        assessments: undefined,
        representations: undefined,
        notes: undefined,
        feedback: undefined,
        phases: undefined,
        selectedRepresentation: undefined,
        completed: false
    },

    initialize: function( attrs ){
        debug( '#initialize', attrs );
        var currentPhaseId = attrs.comparison.get( 'phase' );
        var assessmentPhases = attrs.assessment.get( 'phases' );
        var index = 0;
        if( currentPhaseId ){
            index = assessmentPhases.indexOf( currentPhaseId );
            if( index < 0 ){
                index = 0;
            }
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

    getDocumentByOrder: function( orderId ){
        var representation = this.getRepresentationByOrder( orderId );
        return representation.get( "document" );
    },

    getNoteByOrder: function( orderId ){
        var document = this.getDocumentByOrder( orderId );
        if( document ){
            return this.get( 'notes' ).getNoteByDocId( document._id );
        }
    },

    getFeedbackByOrder: function( order ){
        var representation = this.getRepresentationByOrder( order );
        if( representation ){
            return this.get( 'feedback' ).getFeedbackByRepresentationId( representation.id )
                || this.createFeedback( {}, order );
        }
    },

    notesEnabled: function(){
        return this.get( 'assessment' ).get( 'enableNotes' );
    },

    storeDataForCurrentPhase: function( value ){
        var comparison = this.get( 'comparison' );
        var currentPhase = this.get( 'currentPhase' );
        if( currentPhase.get( 'slug' ) === "selection" ){
            this.set( 'selectedRepresentation', this.get( 'representations' ).get( value ) );
        }
        var update = {
            data: comparison.get( 'data' ) || {},
            phase: this.get( "assessment" ).getNextPhaseId( currentPhase.id )
        };
        update.data[ this.get( 'currentPhase' ).get( 'slug' ) ] = value;
        var handler;
        if( !update.phase ){
            update.completed = true;
            update.phase = null;
            handler = function(){
                this.set( 'completed', true );
            };
        } else {
            handler = function(){
                this.set( 'currentPhase', this.get( 'phases' ).get( update.phase ) );
            }
        }
        comparison.once( "sync", handler, this );
        comparison.update( update );
    },

    storeFeedback: function( feedback ){
        if( feedback.a.positive || feedback.a.negative ){
            this.getFeedbackByOrder( 'a' ).update( {
                positive: feedback.a.positive,
                negative: feedback.a.negative
            } );
        }

        if( feedback.b.positive || feedback.b.negative ){
            this.getFeedbackByOrder( 'b' ).update( {
                positive: feedback.b.positive,
                negative: feedback.b.negative
            } );
        }
        this.storeDataForCurrentPhase( {
            aPositive: feedback.a.positive,
            aNegative: feedback.a.negative,
            bPositive: feedback.b.positive,
            bNegative: feedback.b.negative
        } );
    },

    createFeedback: function( feedback,
                              order ){
        _.defaults( feedback, {
            author: this.get( 'comparison' ).get( 'assessor' ),
            representation: this.getRepresentationByOrder( order ).id
        } );
        return this.get( 'feedback' ).add( feedback );
    },

    createNote: function( noteData,
                          order ){
        _.defaults( noteData, {
            author: this.get( 'comparison' ).get( 'assessor' ),
            document: this.getDocumentByOrder( order )._id
        } );
        return this.get( 'notes' ).create( noteData );
    }
} );
