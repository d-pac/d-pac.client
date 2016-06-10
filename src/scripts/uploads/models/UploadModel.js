'use strict';

const Backbone = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:uploads.models', '[UploadModel]' );
const Representation = require( '../../common/models/RepresentationProxy' );

module.exports = Backbone.Model.extend( {
    representationsCollection: undefined,
    idAttribute: "_id",

    defaults: {
        assessment: undefined,
        representation: undefined
    },

    initialize(){
        debug( '#initialize', this.representationsCollection );
    },

    save( attrs ){
        let representation = this.get( 'representation' );
        if( !representation ){
            representation = new Representation();
            this.set('representation', representation);
            this.representationsCollection.add(representation);
            //add to collection
        }
        representation.once( 'change', (model)=>{
            this.trigger('change:representation');
        } );
        representation.update( attrs );
    },

    uploadingEnabled: function(){
        const assessment = this.get('assessment');
        const state = assessment.get('state');
        return ( state === 'draft') || (state === 'published' && ! this.get( 'representation' ));
    },

    toJSON(){
        const representation = this.get( 'representation' );
        const uploadingEnabled = this.uploadingEnabled();
        return {
            assessment: this.get('assessment').toJSON(),
            representation: (representation) ? representation.toJSON() : undefined,
            uploadingEnabled: uploadingEnabled
        };
    }
} );
