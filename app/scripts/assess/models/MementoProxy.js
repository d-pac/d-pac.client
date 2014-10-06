'use strict';
var debug = require( 'debug' )( 'dpac:assess.models', '[MementoProxy]' );

module.exports = Backbone.NestedModel.extend( {
    phases           : undefined,
    assessments      : undefined,
    representations  : undefined,
    judgements       : undefined,
    comparison       : undefined,
    createComparison : undefined,

    initialize : function( attrs ){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    },

    parse : function( response,
                      options ){
        console.log( response );
        if( response ){
            this.assessments.add( response.assessment );
            this.assessment = this.assessments.get( response.assessment._id );
            this.comparison = this.createComparison( response.comparison );
            this.phases.add( response.phases );
            this.phases.selectByID( this.comparison.get( 'phase' ) );
            this.representations.add( response.representations );

            _.each( response.judgements, function( judgement ){
                judgement.representation = this.representations.get( judgement.representation ).toJSON();
            }, this );

            this.judgements.add( response.judgements );

            this.representations.on( 'select:one', this.representationSelected, this );
        }else{
            //todo: determine what to do when the response is empty, i.e. there are no more comparisons to be made
            throw new Error( 'TODO: determine what to do when response is empty' );
        }
    },

    representationSelected : function( representation ){
        debug.debug( '#representationSelected', representation.id );
        this.phases.selectNext();
        this.comparison.update( {
            selected : representation.id,
            phase    : this.phases.selected.id
        } );
    }

} );
