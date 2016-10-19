'use strict';
const {Model} = require( 'backbone' );
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
        this.intervalId = setInterval( this.update.bind( this ), this.get( 'updateInterval' ) );
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

    stop: function(){
        this.update();
        clearInterval(this.intervalId);
        this.intervalId = undefined;
    }
} );
teardown.model.mixin( module.exports );
