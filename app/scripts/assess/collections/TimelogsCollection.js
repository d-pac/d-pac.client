'use strict';
var Backbone = require( 'backbone' );
var _ = require( 'underscore' );
var debug = require( 'debug' )( 'dpac:assess', '[TimelogsCollection]' );
var teardown = require( '../mixins/teardown' );

var ModelClass = require( '../models/TimelogProxy' );

module.exports = Backbone.Collection.extend( {

    url: "/timelogs",
    model: ModelClass,
    intervalId: undefined,
    updateInterval: 5000,

    contextEvents: {
        'assessment:teardown:requested': "teardown",
        'AuthService:signout:requested': "stop"
    },

    initialize: function( models,
                          opts ){
        debug( '#initialize' );
    },

    isRunning: function(){
        return !! this.intervalId;
    },

    getSelected: function(){
        return this.at(0);
    },

    start: function( comparisonId,
                     phaseId ){
        debug( '#start', comparisonId, phaseId );
        this._stop();
        this.intervalId = setInterval( this.update.bind( this ), this.updateInterval );
        return this.add( {
            comparison: comparisonId,
            phase: phaseId
        } );
    },

    update: function(){
        debug( '#update' );
        this.getSelected().update();
    },

    _stop : function(){
        if(this.isRunning()){
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        var model = this.getSelected();
        if( model ){
            model.update();
            this.remove( model );
        }
        return model;
    },

    stop: function(){
        debug( '#stop' );
        return this._stop();
    },

    onTeardown: function(){
        debug( "#teardown" );
        this.stop();
    }

} );
teardown.collection.mixin( module.exports );
