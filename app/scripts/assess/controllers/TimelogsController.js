'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:assess.controllers', '[TimelogsController]' );
var Marionette = require( 'backbone.marionette' );

module.exports = Marionette.Controller.extend( {
    timelogsCollection: undefined,
    config: undefined,
    currentSelection: undefined,
    context: undefined,

    wiring: {
        config: 'config',
        timelogsCollection: 'timelogsCollection',
        context: 'assessmentContext'
    },

    contextEvents: {
        'comparisons:editing:requested': 'verifyTimelogState',
        'timelogs:stop:requested': 'stopLogging',
        'timelogs:start:requested': 'verifyTimelogState'
    },

    initialize: function(){
        debug( '#initialize' );
        if( this.config.timelogs && this.config.timelogs.interval ){
            this.timelogsCollection.updateInterval=this.config.timelogs.interval;
        }
    },

    verifyTimelogState: function(){
        debug('#verifyTimelogState');
        var current = this.context.getObject('currentSelection');
        var assessment = current.get('assessment');
        if(assessment.get('enableTimeLogging')){
            this.timelogsCollection.start(current.get('comparison' ).id, current.get('currentPhase' ).id);
            this.listenToOnce(current, 'change:currentPhase', function(){
                this.stopListening(current);
                this.verifyTimelogState();
            });
            this.listenToOnce(current, 'change:completed', function(){
                debug('change:completed', arguments);
                this.stopLogging(current);
            });
        }
    },

    stopLogging: function(current){
        debug('#stopLogging');
        this.stopListening(current || this.context.getObject('currentSelection'));
        this.timelogsCollection.stop();
    }
} );
