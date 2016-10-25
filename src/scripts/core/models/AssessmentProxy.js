'use strict';
const { get, set } = require( 'lodash' );
const NestedModel = require( 'backbone-nested-model' );
const debug = require( 'debug' )( 'dpac:core.models', '[AssessmentProxy]' );
const teardown = require( '../../common/mixins/teardown' );

module.exports = NestedModel.extend( {
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
        enableNotes: false,
        enableSelectionIcon: true,
        progress: {
            total: undefined,
            completedNum: undefined, //number of comparisons the user has already made for this assessment
            current: undefined
        },
        results: {
            enable: true,
            assessees: {
                viewRepresentations: true,
                viewRanking: true
            }
        },
        hasResults: false
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
    },

    parse: function( raw ){
        raw.uiCopy = JSON.parse( raw.uiCopy );
        raw.hasResults = (!!raw.stats && !!raw.stats.lastRun && get( raw, [ 'results', 'enable' ], true ));
        set( raw, [ "progress", "current" ], get( raw, [ "progress", "completedNum" ], 0 )+1 );

        return raw;
    },

    getNextPhaseId: function( phaseId ){
        const phases = this.get( 'phases' );
        const index = phases.indexOf( phaseId ) + 1;
        return phases[ index ];
    },

    isRoot: function(){
        return !this.get( "parent" );
    },

    incCompleted: function(){
        const progress = this.get( 'progress' );
        progress.completedNum++;
        this.set( 'progress', progress );
    },

    isCompleted: function(){
        return this.get( 'state' ) === 'completed'
            || this.get( 'progress' ).completedNum >= this.get( 'progress' ).total;
    },

    isActive: function(){
        return !this.isCompleted() && this.get( 'state' ) === 'published';
    },

    assessingAllowed: function(){
        return this.isActive() && (this.isRoot() || !this.parentIsActive());
    },

    getParent: function(){
        return this.get( 'registry' ).get( this.get( 'parent' ) );
    },

    parentIsActive: function(){
        const parentModel = this.getParent();
        if( !parentModel ){
            // most probably this assessment was added to the user, but not it's parent model,
            // i.e. bad config of the assessment.
            return true;
        }
        return parentModel.isActive();
    },

    onTeardown: function(){
        debug( "#teardown" );
    }
} );
teardown.model.mixin( module.exports );
