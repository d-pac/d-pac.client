'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[SeqProxy]' );
module.exports = Backbone.Model.extend( {

    idAttribute : "_id",
    defaults : {
        value      : 4,
        phase      : undefined, // Phase.id
        comparison : undefined // Comparison.id
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Backbone.Select.Me.applyTo( this );
        //todo: don't know why but we have to do it like this, otherwise we get an error
        var model = this;
        var saveModel = function(){
            model.save();
        };
        this.on('change:value', saveModel);
    }
} );
