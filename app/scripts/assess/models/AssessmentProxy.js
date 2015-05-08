'use strict';
var Backbone = require('backbone');
var Select = require('backbone.select');
var debug = require( 'debug' )( 'dpac:assess.models', '[AssessmentProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        title          : undefined,
        assignments    : {
            assessor: undefined,
            assessee: undefined
        },
        state          : undefined,
        phases         : [],
        parent: undefined,
        comparisonsNum : {
            total: undefined,
            stage: undefined
        },
        uiCopy: undefined,
        enableTimeLogging: false
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
