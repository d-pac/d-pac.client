'use strict';
var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:core.collections', '[AssessmentsCollection]' );
var teardown = require( '../../common/mixins/teardown' );
var selectable = require( '../../common/mixins/selectable' );
var safeSync = require( '../../common/mixins/safeSync' );
var propagateEvents = require( '../../common/mixins/propagateEvents' );

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

    parse: function( raw ){
        var docs = raw.data || [];

        return docs.map( function( doc ){
            doc.registry = this;
            return doc;
        }.bind( this ) );
    },

    fetch: function(){
        debug( '#fetch' );
        return Backbone.Collection.prototype.fetch.apply( this, _.toArray( arguments ) );
    },

    //==( by role )==/

    listById: function( ids ){
        var models = this.filter( function( model ){
            return ids.indexOf( model.id ) >= 0;
        } );
        return new AssessmentsCollection( models );
    },

    //==( actives )==//

    getAssessables: function(){
        var models = this.filter( function( assessment ){
            return assessment.assessingAllowed();
        } );
        return new AssessmentsCollection( models );
    },

    //==( extras )==/

    onTeardown: function(){
        this.deselect();
        this.roles( 'teardown' );
    }
} );
module.exports = AssessmentsCollection;

propagateEvents.mixin( module.exports ).propagate( {
    "sync": "assessments:collection:sync"
} );
selectable.collection.mixin( module.exports );
safeSync.collection.mixin( module.exports );
teardown.collection.mixin( module.exports );

