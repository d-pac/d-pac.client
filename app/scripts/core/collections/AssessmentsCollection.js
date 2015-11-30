'use strict';
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:assess.collections', '[AssessmentsCollection]' );
var teardown = require( '../../common/mixins/teardown' );

var ModelClass = require( '../models/AssessmentProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/user/assessments',
    model: ModelClass,
    selected: undefined,

    contextEvents: {
        'assess:teardown:requested': "teardown",
        'assess:ui:destroyed': "_deselectSelected"
    },

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    },

    getActives: function(){
        return this.filter( function( assessment ){
            return assessment.isActive();
        } );
    },

    getActivesJSON: function(){
        return _.map( this.getActives(), function( model ){
            return model.toJSON();
        } );
    },

    selectByID: function( assessmentId ){
        debug( "#selectByID" );
        var model = this.get( assessmentId );
        this.selected = model;
        return model;
    },

    _deselectSelected: function(){
        debug("#_deselectSelected");
        this.deselect();
    },

    deselect: function(model){
        debug('#deselect', model);
        if(!model || this.selected===model){
            this.selected = undefined;
            return model;
        }
    },

    select: function(model){
        this.selected = model;
        return model;
    },

    resync: function(){
        this.reset();
        this.fetch();
    },

    onTeardown: function(){
      this.deselect();
    }
} );
teardown.collection.mixin( module.exports );

