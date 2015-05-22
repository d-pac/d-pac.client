'use strict';
var Backbone = require( 'backbone' );
var Select = require( 'backbone.select' );
var debug = require( 'debug' )( 'dpac:assess.models', '[AssessmentProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = Backbone.Model.extend( {
    idAttribute: "_id",
    defaults: {
        title: undefined,
        assignments: {
            assessor: undefined,
            assessee: undefined
        },
        state: undefined,
        phases: [],
        parent: undefined,
        comparisonsNum: {
            total: undefined,
            stage: undefined
        },
        uiCopy: undefined,
        enableTimeLogging: false,
        completedNum: undefined //number of comparisons the user has already made for this assessment
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
        Select.Me.applyTo( this );
    },

    parse: function( raw ){
        raw.uiCopy = JSON.parse( raw.uiCopy );
        return raw;
    },

    getNextPhaseId: function( phaseId ){
        var phases = this.get( 'phases' );
        var index = phases.indexOf( phaseId ) + 1;
        return phases[index];
    },

    isRoot: function(){
        var parent = this.get("parent");
        if(parent){
            return !this.collection.get(parent);
        }
        return true;
    },

    incCompleted: function(){
        this.set('completedNum', this.get('completedNum')+1);
    },

    onTeardown: function(){
        debug( "#teardown" );
        this.deselect( { silent: true } );
    }
} );
teardown.model.mixin( module.exports );
