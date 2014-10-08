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
        representation : undefined, //representation obj, not model
        note           : undefined
    },

    initialize : function(attrs, opts){
        debug( '#initialize' );
        //todo: don't know why but we have to do it like this, otherwise we get an error
        var model = this;
        var saveModel = function(){
            model.save();
        };
        this.on('change:passed', saveModel);
    },

    getURL : function(){
        var name = this.get('representation.file.filename');
        var path = this.get('representation.file.path');
        return [path, name].join('/');
    }
} );
