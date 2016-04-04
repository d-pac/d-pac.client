'use strict';
const _ = require( 'lodash' );
const Backbone = require( 'backbone' );

const debug = require( 'debug' )( 'dpac:uploads.collections', '[UploadsCollection]' );
const Model = require( './UploadModel' );
module.exports = Backbone.Collection.extend( {
    model: Model,

    assessmentsCollection: undefined,
    representationsCollection: undefined,

    initialize: function(){
        debug( '#initialize' );
        this._createModels();
    },

    _createModels: function(){
        const representationsByAssessment = this.representationsCollection.groupBy( 'assessment' );
        const models = this.assessmentsCollection.sortBy( "title" ).map( ( assessment )=>{
            const model = {
                assessment: assessment
            };
            let representations = representationsByAssessment[ model.assessment.id ];
            if( representations && representations.length ){
                model.representation = representations[ 0 ];
            }
            return model;
        } );
        this.reset( models );
    },

} );
