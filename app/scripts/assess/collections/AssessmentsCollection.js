'use strict';
var Backbone = require('backbone');

var debug = require( 'debug' )( 'dpac:assess.collections', '[AssessmentsCollection]' );
var teardown = require( '../mixins/teardown' );

var ModelClass = require( '../models/AssessmentProxy' );

module.exports = Backbone.Collection.extend( {
    url           : '/user/assessments',
    model         : ModelClass,
    contextEvents : {
        'assessment:teardown:requested' : "teardown"
    },

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );
    },

    parse : function(response){
       return response.data;
    },

    selectByID : function( id ){
        var model = this.get( id );
        this.select( model );
    },

    updateAndSelect : function( attrs ){
        var model = this.add( attrs, { merge : true } );
        this.select(model);
    },

    resync : function(){
        this.reset();
        this.fetch();
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.deselect( this.selected, { silent : true } );
    }
} );
teardown.collection.mixin( module.exports );

