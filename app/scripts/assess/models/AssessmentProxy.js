'use strict';
var Backbone = require('backbone');

var debug = require( 'debug' )( 'dpac:assess.models', '[AssessmentProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        title          : undefined,
        description    : undefined,
        state          : undefined,
        phases         : [],
        order          : 0,
        comparisonsNum : 0
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
