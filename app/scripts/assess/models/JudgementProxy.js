'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[JudgementProxy]' );
module.exports = Backbone.NestedModel.extend( {
    config : undefined,
    idAttribute : "_id",
    defaults    : {
        assessment     : undefined,
        assessor       : undefined,
        comparison     : undefined,
        passed         : undefined,
        rank           : undefined,
        representation : undefined, //representation obj, not model
        note           : undefined
    },

    initialize : function(attrs, opts){
        debug( '#initialize' );
    },

    getURL : function(){
        var name = this.get('representation.file.filename');
        var path = this.get('representation.file.path');
        return [path, name].join('/');
    }
} );
