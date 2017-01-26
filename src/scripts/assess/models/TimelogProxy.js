'use strict';
const { Model } = require( 'backbone' );
const moment = require( 'moment' );
const debug = require( 'debug' )( 'dpac:assess', '[TimelogProxy]' );
const teardown = require( '../../common/mixins/teardown' );
module.exports = Model.extend( {
    idAttribute: "_id",

    intervalId: undefined,

    defaults: {
        comparison: undefined, //{Comparison.id}
        phase: undefined, //{Phase.id}
        begin: undefined, //{String}
        end: undefined, //{String}
        updateInterval: undefined
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
        const now = moment().format();
        this.set( 'begin', now );
        this.set( 'end', now );

        this.save();
        this.startPolling();
    },

    parse: function( raw ){
        return raw.data;
    },

    update: function(){
        debug( "#update", this.id || '<new>' );
        const now = moment().format();
        this.save( {
            end: now
        }, { patch: true } );

        return this;
    },

    startPolling: function(){
        debug( `Start polling server every ${this.get( 'updateInterval' ) / 1000} seconds ` );
        this.intervalId = setInterval( this.update.bind( this ), this.get( 'updateInterval' ) );
    },

    stopPolling: function(){
        clearInterval( this.intervalId );
        this.intervalId = undefined;
    },

    stop: function(){
        this.update();
        this.stopPolling();
    },

    save: function( attrs = null,
                    options = {} ){
        options.disableErrorPropagation = true;
        options.error = ( err ) =>{
            this.stopPolling();
            this.set( 'updateInterval', this.get( 'updateInterval' ) + 3000 ); //lower polling frequency for low latency networks
            this.startPolling();
        };
        Model.prototype.save.call( this, attrs, options );
    }
} );
teardown.model.mixin( module.exports );
