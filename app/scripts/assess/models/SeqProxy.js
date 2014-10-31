'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[SeqProxy]' );
var teardown = require('../mixins/teardown');

module.exports = Backbone.Model.extend( {

    idAttribute : "_id",
    defaults : {
        value      : 0,
        phase      : undefined, // Phase.id
        comparison : undefined // Comparison.id
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Backbone.Select.Me.applyTo( this );

        var model = this;
        //todo: don't know why but we have to do it like this, otherwise we get an error
        var saveModel = function(){
            model.save();
        };
        this.on('change:value', saveModel);

        this.setupValues();
    },

    setupValues : function(){
        var values = [];
        for(var i=0; i<7; i++){
            values.push(i+1);
        }
        this.set('values', values);
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.off('change');
        this.deselect( { silent : true } );
    }
} );
teardown.model.mixin( module.exports );
