'use strict';
const _ = require( 'lodash' );
const Backbone = require( 'backbone' );

const debug = require( 'debug' )( 'dpac:uploads.collections', '[UploadsCollection]' );
const Model = require( './UploadModel' );
module.exports = Backbone.Collection.extend( {
    model: Model,
    url: "/representations",


    assessmentsCollection: undefined,
    representationsCollection: undefined,

    initialize: function(){
        debug( '#initialize' );
        this._createModels();
    },

    _createModels: function(){
        const representationsByAssessment = this.representationsCollection.groupBy( 'assessment' );
        const models = this.assessmentsCollection.sortBy( "title" ).map( ( assessment )=>{
            assessment = assessment.toJSON();
            let representations = representationsByAssessment[ assessment._id ] || [];
            representations = representations.map( ( representation )=>representation.toJSON())
            return {
                assessment : assessment,
                representations: representations
            };
        } );
        this.reset(models);
    },

    // create: function( file,
    //                   assessment ){
    //     const formdata = new FormData();
    //     formdata.append( 'file', file );
    //     formdata.append( 'assessment', assessment );
    //     Backbone.sync( 'create', { trigger: _.noop }, {
    //         data: formdata,
    //         processData: false,
    //         contentType: false,
    //         url: '/representations/actions/upload',
    //         success: ( data )=>{
    //             console.log( data );
    //         }
    //     } );
    // }
} );
