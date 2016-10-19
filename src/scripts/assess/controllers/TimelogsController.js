'use strict';

const debug = require( 'debug' )( 'dpac:assess.controllers', '[TimelogsController]' );
const {Controller} = require( 'backbone.marionette' );

module.exports = Controller.extend( {
    timelogsCollection: undefined,
    config: undefined,
    currentSelection: undefined,

    contextEvents: {
        'comparisons:editing:requested': 'verifyTimelogState',
        'comparisons:editing:completed': 'stopLogging',
        'assess:pause:requested': 'stopLogging',
        'assess:resume:requested': 'verifyTimelogState'
    },

    initialize: function(){
        debug( '#initialize' );
        if( this.config.timelogs && this.config.timelogs.interval ){
            this.timelogsCollection.updateInterval=this.config.timelogs.interval;
        }
    },

    verifyTimelogState: function(){
        debug('#verifyTimelogState');

        const current = this.currentSelection;
        const assessment = current.get('assessment');
        if(assessment && assessment.get('enableTimeLogging')){
            this.timelogsCollection.start(current.get('comparison' ).id, current.get('phase' ).id);
            this.listenToOnce(current, 'change:phase',function(){
                debug('change:phase');
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
