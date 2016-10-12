'use strict';
const {extend, defaults} = require( 'lodash' );

var SYNCING = 'syncing';
var SYNCED = 'synced';
var READY = 'ready';

module.exports.collection = {
    mixin: function( collectionClass,
                     opts ){
        opts = defaults( {}, opts, {
            once: false
        } );
        collectionClass.prototype.__safeSyncOverridden__fetch = collectionClass.prototype.fetch;
        collectionClass.prototype.__safeSyncOverridden__reset = collectionClass.prototype.reset;
        extend( collectionClass.prototype, {
            fetch: function(...args){
                if( opts.once && this._syncingState === SYNCED ){
                    this.trigger( 'sync', this );

                } else if( !this._syncingState || this._syncingState !== SYNCING ){
                    this._syncingState = SYNCING;
                    this.once( 'sync', ()=>{
                        this._syncingState = SYNCED;
                    } );
                    collectionClass.prototype.__safeSyncOverridden__fetch.apply( this, args );
                }
            },

            reset: function(...args){
                this._syncingState = READY;
                collectionClass.prototype.__safeSyncOverridden__reset.apply( this, args );
            },

            isSynced: function(){
                return this._syncingState === SYNCED;
            },
        } );
    }
};
