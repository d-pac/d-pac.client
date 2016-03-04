'use strict';
var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:core.collections', '[AssessmentsFacade]' );
var teardown = require( '../../common/mixins/teardown' );
var selectable = require( '../../common/mixins/selectable' );
var safeSync = require( '../../common/mixins/safeSync' );

var ModelClass = require( '../models/AssessmentProxy' );

var BaseCollection = Backbone.Collection.extend( {
    selected: undefined,
    //==( actives )==//

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

} );
teardown.collection.mixin( BaseCollection );
selectable.mixin( BaseCollection );

module.exports = BaseCollection.extend( {
    url: '/user/assessments',
    model: ModelClass,

    _synced: false,

    contextEvents: {
        'assess:teardown:requested': "teardown",
        'assess:ui:destroyed': function(){
            this.deselect();
        }
    },

    initialize: function( models ){
        debug( '#initialize' );

        this.byRole = {};
    },

    parse: function( raw ){
        var docs = raw.data || [];

        return docs.map( function( doc ){
            doc.registry = this;
            return doc;
        }.bind( this ) );
    },

    isSynced: function(){
        return this._synced;
    },

    deselect: function(){
        this.roles( 'deselect' );
        BaseCollection.prototype.deselect.call( this );
    },

    //==( by role )==/

    setRoles: function( roles ){
        _.each( roles, function( assessmentIds,
                                 role ){
            this.byRole[ role ] = new BaseCollection( this.filter( function( assessment ){
                return assessmentIds.indexOf( assessment.id ) > -1;
            } ) );
        }, this );
    },

    getForRole: function( role ){
        return this.byRole[ role ];
    },

    roles: function( action ){
        _.each( this.byRole, function( collection,
                                       role ){
            collection[ action ]();
        } );

    },

    //==( extras )==/

    onTeardown: function(){
        this.deselect();
        this.roles( 'teardown' );
    }
} );
safeSync.collection.mixin( module.exports );
teardown.collection.mixin( module.exports );

