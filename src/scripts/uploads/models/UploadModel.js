'use strict';
const _ = require( 'lodash' );
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
        debug( '#initialize' );
    },

    save( attrs ){
        let representation = this.get( 'representation' );
        if( !representation ){
            representation = new Representation();
            this.set('representation', representation);
            //add to collection
        }
        representation.once( 'change', (model)=>{
            this.trigger('change:representation');
        } );
        representation.update( attrs );
    },

    toJSON(){
        const representation = this.get( 'representation' );
        return {
            assessment: this.get( 'assessment' ).toJSON(),
            representation: (representation) ? representation.toJSON() : undefined
        }
    }
} );
