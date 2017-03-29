'use strict';
const { isString, get } = require( 'lodash' );
const NestedModel = require( 'backbone-nested-model' );
const debug = require( 'debug' )( 'dpac:common.models', '[RepresentationProxy]' );
const teardown = require( '../../common/mixins/teardown' );

module.exports = NestedModel.extend( {
    idAttribute: "_id",
    urlRoot: "/representations",

    defaults: {
        name: undefined,
        anonymized: undefined,
        assessment: undefined,
        comparisons: [],
        document: {
            _id: undefined,
            _rid: undefined,
            ext: undefined,
            mimeType: undefined,
            href: undefined,
            text: undefined,
            title: undefined,
            owner: [],
            originalName: undefined,
        },
        selected: false
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
    },

    select: function(){
        this.set( 'selected', true );
    },

    deselect: function(){
        this.set( 'selected', false );
    },

    hasDescription: function(){
        return (this.get( 'document.mimeType' ) !== 'text/html')
            && !!this.get( 'document.text' );
    },

    toJSON: function(){
        const data = NestedModel.prototype.toJSON.call( this );
        data.hasDescription = this.hasDescription();
        return data;
    },

    update: function( attrs ){
        const formdata = new FormData();
        formdata.append( 'file', attrs.file );
        formdata.append( 'assessment', attrs.assessment );
        formdata.append( 'document', this.get( 'document._id' ) );
        this.save( null, {
            data: formdata,
            processData: false,
            contentType: false,
            patch: true,
            wait: true
        } );
    },

    parse: function( raw ){
        const output = ( raw.data )
            ? raw.data
            : raw;
        output.anonymized = get( output, [ "document", "title" ], output._id );
        return output;
    },

    isOwnedBy: function( idOrObj ){
        const id = isString( idOrObj )
            ? idOrObj
            : idOrObj._id;
        const owners = this.get( 'document.owner' ) || [];
        return owners.indexOf( id ) >= 0;
    }
} );
teardown.model.mixin( module.exports );

