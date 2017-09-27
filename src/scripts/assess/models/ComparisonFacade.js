'use strict';
const { find, defaults } = require( 'lodash' );
const { Model } = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonFacade]' );

module.exports = Model.extend( {
    comparisonsCollection: undefined,
    assessmentsCollection: undefined,
    representationsCollection: undefined,
    notesCollection: undefined,
    feedbackCollection: undefined,
    phasesCollection: undefined,
    defaults: {
        assessment: undefined,
        comparison: undefined,
        representation: undefined,
        phase: undefined,
        completed: false
    },

    initialize: function(){
        this.comparisonsCollection.on( 'change:selected', ( comparison,
                                                            oldComparison )=>{
            if( oldComparison ){
                oldComparison.off( null, null, this );
            }
            if( comparison ){
                this.set( 'comparison', comparison );
                this.set( 'assessment', this.assessmentsCollection.selected );
                comparison.on( 'sync', this.update, this );
                this.update();
            } else {
                this.clear();
            }
        } );

    },

    clear: function( ...args ){
        debug( '#clear' );
        return Model.prototype.clear.apply( this, args );
    },

    update: function(){
        debug( '#update' );

        const assessmentPhases = this.get( 'assessment' ).get( 'phases' );
        let currentPhaseId = this.get( 'comparison' ).get( 'phase' );
        let index = 0;
        if( currentPhaseId ){
            index = assessmentPhases.indexOf( currentPhaseId );
            if( index < 0 ){
                index = 0;
            }
        }
        currentPhaseId = assessmentPhases[ index ];
        this.set( 'phase', this.phasesCollection.get( currentPhaseId ) );
        const selectedRepId = this.get( 'comparison' ).get( 'data' ).selection;
        this.set( 'representation', this.representationsCollection.get( selectedRepId ) );
    },

    getRepresentationByOrder: function( orderId ){
        const repId = this.get( "comparison" ).get( "representations" )[ orderId ];
        return this.representationsCollection.get( repId );
    },

    getSelectedRepresentationOrder: function(){
        const selectedRep = this.get( 'representation' );
        if( selectedRep ){
            let found;
            find( this.get( 'comparison' ).get( 'representations' ), function( representationId,
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
        const representation = this.getRepresentationByOrder( orderId );
        return representation.get( "document" );
    },

    getNoteByOrder: function( orderId ){
        const document = this.getDocumentByOrder( orderId );
        if( document ){
            return this.notesCollection.getNoteByDocId( document._id );
        }
    },

    getFeedbackByOrder: function( order ){
        const representation = this.getRepresentationByOrder( order );
        const currentPhaseSlug = this.get( 'phase' ).get( 'slug' );
        if( representation ){
            return this.feedbackCollection.getFeedbackByRepresentationId( representation.id, currentPhaseSlug )
                || this.createFeedback( { phase: currentPhaseSlug }, order );
        }
    },

    notesEnabled: function(){
        return this.get( 'assessment' ).get( 'enableNotes' );
    },

    storeDataForCurrentPhase: function( value ){
        const currentPhaseSlug = this.get( 'phase' ).get( 'slug' );
        const update = {
            data: this.get( 'comparison' ).get( 'data' ) || {},
            phase: this.get( "assessment" ).getNextPhaseId( this.get( 'phase' ).id )
        };
        update.data[ currentPhaseSlug ] = value;
        if( !update.phase ){
            update.completed = true;
        }
        this.get( 'comparison' ).update( update );
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
        defaults( feedback, {
            author: this.get( 'comparison' ).get( 'assessor' ),
            representation: this.getRepresentationByOrder( order ).id
        } );
        return this.feedbackCollection.add( feedback );
    },

    createNote: function( noteData,
                          order ){
        defaults( noteData, {
            author: this.get( 'comparison' ).get( 'assessor' ),
            document: this.getDocumentByOrder( order )._id
        } );
        return this.notesCollection.create( noteData );
    }
} );
