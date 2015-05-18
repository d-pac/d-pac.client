'use strict';
var Backbone = require( 'backbone' );
var Select = require( 'backbone.select' );

var debug = require( 'debug' )( 'dpac:assess.collections', '[AssessmentsCollection]' );
var teardown = require( '../mixins/teardown' );

var ModelClass = require( '../models/AssessmentProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/user/assessments',
    model: ModelClass,
    _rootAssessments: undefined,

    contextEvents: {
        'assessment:teardown:requested': "teardown"
    },

    initialize: function( models ){
        debug( '#initialize' );
        Select.One.applyTo( this, models );
        this.on( "add remove", this._invalidateRootAssessments, this );
    },

    _invalidateRootAssessments: function(){
        this._rootAssessments = undefined;
    },

    parse: function( raw ){
        return raw.data;
    },

    selectByID: function( id ){
        var model = this.get( id );
        this.select( model );
    },

    updateAndSelect: function( attrs ){
        var model = this.add( attrs, { merge: true } );
        this.select( model );
    },

    getRootAssessments: function(){
        if( !this._rootAssessments ){
            this._rootAssessments = this.filter( function( assessment ){
                return assessment.isRoot();
            } );
        }
        return this._rootAssessments;
    },

    resync: function(){
        this.reset();
        this.fetch();
    },

    onTeardown: function(){
        debug( "#teardown" );
        this.deselect( this.selected, { silent: true } );
    }
} );
teardown.collection.mixin( module.exports );

