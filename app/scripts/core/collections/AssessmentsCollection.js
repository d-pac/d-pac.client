'use strict';
var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:core.collections', '[AssessmentsCollection]' );
var teardown = require( '../../common/mixins/teardown' );

var ModelClass = require( '../models/AssessmentProxy' );

module.exports = Backbone.Collection.extend( {
    url: '/user/assessments',
    model: ModelClass,
    selected: undefined,

    contextEvents: {
        'assess:teardown:requested': "teardown",
        'assess:ui:destroyed': function(){
            this.deselect();
        }
    },

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    },

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
        debug( "#selectByID" );
        var model = this.get( assessmentId );
        this.selected = model;
        return model;
    },

    deselect: function( model ){
        debug( '#deselect', model );
        if( !model || this.selected === model ){
            this.selected = undefined;
            return model;
        }
    },

    select: function( model ){
        this.selected = model;
        return model;
    },

    //==( by role )==/

    setRoles: function( roles ){
        this.byRole = {};
        _.each( roles, function( assessmentIds,
                                 role ){
            this.byRole[ role ] = new module.exports( this.filter( function( assessment ){
                return assessmentIds.indexOf( assessment.id ) > -1;
            } ) );
        }, this );
        console.log( 'AssessmentsCollection', this.byRole );
    },

    //==( extras )==/

    resync: function(){
        this.reset();
        this.fetch();
    },

    onTeardown: function(){
        this.deselect();
    }
} );
teardown.collection.mixin( module.exports );

