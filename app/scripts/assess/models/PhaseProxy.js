'use strict';
var Backbone = require('backbone');
var Select = require('backbone.select');
var S = require('string');
var debug = require( 'debug' )( 'dpac:assess.models', '[PhaseProxy]' );
var teardown = require('../mixins/teardown');
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        type : undefined,
        label : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Select.Me.applyTo( this );
    },
    onTeardown : function(){
        debug( "#teardown" );
        this.deselect( { silent : true } );
    }
} );
teardown.model.mixin( module.exports );

