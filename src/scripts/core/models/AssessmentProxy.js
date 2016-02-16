'use strict';
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:core.models', '[AssessmentProxy]' );
var teardown = require( '../../common/mixins/teardown' );

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
        uiCopy: undefined,
        enableTimeLogging: false,
        progress: {
            total: undefined,
            completedNum: undefined //number of comparisons the user has already made for this assessment
        },
        hasResults: false
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
    },

    parse: function( raw ){
        raw.uiCopy = JSON.parse( raw.uiCopy );
        raw.hasResults = (raw.stats && raw.stats.lastRun);
        return raw;
    },

    getNextPhaseId: function( phaseId ){
        var phases = this.get( 'phases' );
        var index = phases.indexOf( phaseId ) + 1;
        return phases[ index ];
    },

    isRoot: function(){
        var parent = this.get( "parent" );
        if( parent ){
            var parentModel = this.collection.get( parent );
            return !parentModel || parentModel.isCompleted();
        }
        return true;
    },

    incCompleted: function(){
        var progress = this.get( 'progress' );
        progress.completedNum++;
        this.set( 'progress', progress );
        if( this.isCompleted() ){
            this.collection.deselect( this );
        }
    },

    isCompleted: function(){
        return this.get( 'progress' ).completedNum >= this.get( 'progress' ).total;
    },

    isActive: function(){
        return this.isRoot() && !this.isCompleted();
    },

    onTeardown: function(){
        debug( "#teardown" );
    }
} );
teardown.model.mixin( module.exports );
