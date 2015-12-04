'use strict';
var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:core.collections', '[AssessmentsFacade]' );
var teardown = require( '../../common/mixins/teardown' );
var selectable = require('../../common/mixins/selectable');

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
selectable.mixin(BaseCollection);

module.exports = Backbone.Collection.extend( {
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
        this.once( 'sync', function(){
            this._synced = true;
        }, this )
    },

    parse: function( raw ){
        return raw.data;
    },

    isSynced: function(){
        return this._synced;
    },

    deselect: function(){
        this.roles( 'deselect' );
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

teardown.collection.mixin( module.exports );

