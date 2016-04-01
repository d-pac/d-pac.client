'use strict';
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:assess', '[TimelogsCollection]' );
var teardown = require( '../../common/mixins/teardown' );

var ModelClass = require( '../models/TimelogProxy' );

module.exports = Backbone.Collection.extend( {

    url: "/timelogs",
    model: ModelClass,
    updateInterval: 5000,

    contextEvents: {
        'assess:teardown:requested': "teardown",
        'assess:ui:destroyed': "stop"
    },

    initialize: function( models,
                          opts ){
        debug( '#initialize' );
    },

    getSelected: function(){
        return this.at(0);
    },

    start: function( comparisonId,
                     phaseId ){
        debug( '#start', comparisonId, phaseId );
        this._stop();
        return this.add( {
            comparison: comparisonId,
            phase: phaseId,
            updateInterval: this.updateInterval
        } );
    },

    _stop : function(){
        var model = this.getSelected();
        if( model ){
            model.stop();
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
        this._stop();
    }

} );
teardown.collection.mixin( module.exports );
