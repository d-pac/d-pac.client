'use strict';
var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:core.collections', '[AssessmentsFacade]' );
var teardown = require( '../../common/mixins/teardown' );
var selectable = require( '../../common/mixins/selectable' );
var safeSync = require( '../../common/mixins/safeSync' );

var ModelClass = require( '../models/AssessmentProxy' );

var AssessmentsCollection = Backbone.Collection.extend( {
    url: '/user/assessments',
    model: ModelClass,

    selected: undefined,

    contextEvents: {
        'assess:teardown:requested': "teardown",
        'authentication:signout:completed': function(){
            this.reset();
        }
    },

    initialize: function( models ){
        debug( '#initialize' );

    },

    reset: function(){
        debug( '#reset' );
        this.deselect();
        var args = _.toArray( arguments );
        return Backbone.Collection.prototype.reset.apply( this, args );
    },

    parse: function( raw ){
        var docs = raw.data || [];

        return docs.map( function( doc ){
            doc.registry = this;
            return doc;
        }.bind( this ) );
    },

    //==( by role )==/

    cloneSubset: function( ids ){
        var models = this.filter( function( model ){
            return ids.indexOf( model.id ) >= 0;
        } );
        return new AssessmentsCollection( models );
    },

    //==( actives )==//

    getAssessables: function(){
        return this.filter( function( assessment ){
            return assessment.assessingAllowed();
        } );
    },

    getAssessablesJSON: function(){
        return _.map( this.getAssessables(), function( model ){
            return model.toJSON();
        } );
    },

    //==( extras )==/

    onTeardown: function(){
        this.deselect();
        this.roles( 'teardown' );
    }
} );
module.exports = AssessmentsCollection;

selectable.mixin( module.exports );
safeSync.collection.mixin( module.exports );
teardown.collection.mixin( module.exports );

