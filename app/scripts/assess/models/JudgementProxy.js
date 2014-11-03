'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[JudgementProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = Backbone.NestedModel.extend( {
    config      : undefined,
    idAttribute : "_id",
    defaults    : {
        assessment     : undefined,
        assessor       : undefined,
        comparison     : undefined,
        passed         : undefined,
        representation : undefined, //reference to RepresentationProxy instance [!]
        notes          : undefined,
        position       : undefined
    },

    initialize : function( attrs,
                           opts ){
        debug( '#initialize', this.id || '<new>' );

        //todo: don't know why but we have to do it like this, otherwise we get an error
        var model = this;
        var saveModel = function(){
            model.save();
        };
        this.on( 'change:passed', saveModel );
        this.on( 'change:notes', saveModel );
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.off( 'change' );
    }

} );
teardown.model.mixin( module.exports );
