'use strict';
const _ = require( 'lodash' );
const NestedModel = require( 'backbone-nested-model' );
const Backbone = require('backbone');
const debug = require( 'debug' )( 'dpac:uploads.models', '[UploadModel]' );

module.exports = NestedModel.extend( {
    defaults: {
        assessment: undefined,
        representations: undefined
    },

    initialize: function(){
        debug( '#initialize' );
    },

    save: function(attrs){
        const formdata = new FormData();
        formdata.append( 'file', attrs.file );
        formdata.append( 'assessment', attrs.assessment );
        Backbone.sync( 'create', this, {
            data: formdata,
            processData: false,
            contentType: false,
            url: '/representations/actions/upload',
            success: ( data )=>{
                console.log( data );
            },
            error : _.noop
        } );
    }
} );
