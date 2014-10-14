'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[AssessmentsCollection]' );
var teardown = require( '../mixins/teardown' );

var ModelClass = require( '../models/AssessmentProxy' );

module.exports = Backbone.Collection.extend( {
    url           : '/me/assessments',
    model         : ModelClass,
    contextEvents : {
        'assessment:teardown:requested' : "teardown"
    },

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );
    },

    selectByID : function( id ){
        var model = this.get( id );
        this.select( model );
    },

    merge : function( models ){
        this.add( models, { merge : true } );
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.deselect( this.selected, { silent : true } );
    }
} );
teardown.collection.mixin( module.exports );

