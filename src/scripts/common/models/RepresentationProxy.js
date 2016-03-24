'use strict';
var NestedModel = require( 'backbone-nested-model' );
var debug = require( 'debug' )( 'dpac:common.models', '[RepresentationProxy]' );
var teardown = require( '../../common/mixins/teardown' );

module.exports = NestedModel.extend( {
    idAttribute: "_id",
    urlRoot: "/representations",

    defaults: {
        name: undefined,
        assessment: undefined,
        document: {
            ext: undefined,
            mimeType: undefined,
            href: undefined,
            text: undefined
        },
        selected: false
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
        console.log(this.url());
    },

    select: function(){
        this.set( 'selected', true );
    },

    deselect: function(){
        this.set( 'selected', false );
    },

    hasDescription: function(){
        return (this.get('document.mimeType') !== 'text/html')
            && !!this.get('document.text');
    },

    toJSON: function(){
        var data = NestedModel.prototype.toJSON.call( this );
        data.hasDescription = this.hasDescription();
        return data;
    }
} );
teardown.model.mixin( module.exports );

