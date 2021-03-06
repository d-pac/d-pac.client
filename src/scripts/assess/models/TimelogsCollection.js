'use strict';
const {Collection} = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:assess', '[TimelogsCollection]' );
const teardown = require( '../../common/mixins/teardown' );

const ModelClass = require( '../models/TimelogProxy' );

module.exports = Collection.extend( {

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
        const model = this.getSelected();
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
