'use strict';
var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:core.collections', '[AssessmentsFacade]' );
var teardown = require( '../../common/mixins/teardown' );

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

    //==( selectable )==//

    selectByID: function( assessmentId ){
        debug( "#selectByID", assessmentId );
        return this.select(this.get(assessmentId));
    },

    deselect: function( model ){
        debug( '#deselect', model );
        if( !model || this.selected === model ){
            this.select(undefined);
            return model;
        }
    },

    select: function( model ){
        this.selected = model;
        return model;
    },

} );
teardown.collection.mixin( BaseCollection );

module.exports = BaseCollection.extend( {
    url: '/user/assessments',
    model: ModelClass,
    selected: undefined,

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
        BaseCollection.prototype.deselect.call( this );
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

