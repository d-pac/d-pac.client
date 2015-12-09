'use strict';

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
        context: 'moduleContext'
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
        if(this.current !== current){
            this.current = current;
            this.listenToOnce(current, 'change:completed', function(model){
                debug("change:completed");
                this.current = undefined;
                this.stopListening(model);
                this.stopLogging();
            });
        }
        var assessment = current.get('assessment');
        if(assessment.get('enableTimeLogging')){
            this.timelogsCollection.start(current.get('comparison' ).id, current.get('currentPhase' ).id);
            this.listenToOnce(current, 'change:currentPhase',function(){
                debug('change:currentPhase');
                this.verifyTimelogState();
            });
        }else{
            this.stopLogging();
        }
    },

    stopLogging: function(){
        debug('#stopLogging');
        this.timelogsCollection.stop();
    }
} );
