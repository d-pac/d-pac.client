'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[RepresentationProxy]' );
var teardown = require('../mixins/teardown');
module.exports = Backbone.NestedModel.extend( {
    idAttribute : "_id",

    defaults : {
        assessee   : undefined,
        assessment : undefined,
        ext        : undefined,
        mimeType   : undefined,
        url        : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Backbone.Select.Me.applyTo( this );
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.deselect( { silent : true } );
    }
} );
teardown.model.mixin( module.exports );

