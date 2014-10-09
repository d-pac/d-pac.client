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
        representation : undefined, //reference to RepresentationProxy instance [!]
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

    get: function (attr) {
      if (typeof this[ "_get_" + attr] == 'function')
      {
        return this["_get_" + attr]();
      }

      return Backbone.Model.prototype.get.call(this, attr);
    },

    _get_fileUrl : function(){
        return this.get('representation' ).get('url');
    }
} );
