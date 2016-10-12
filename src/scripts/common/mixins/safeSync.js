'use strict';
const {extend, defaults, toArray} = require( 'lodash' );

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
            fetch: function(){
                if( opts.once && this._syncingState === SYNCED ){
                    this.trigger( 'sync', this );

                } else if( !this._syncingState || this._syncingState !== SYNCING ){
                    this._syncingState = SYNCING;
                    this.once( 'sync', function(){
                        this._syncingState = SYNCED;
                    }.bind(this) );
                    collectionClass.prototype.__safeSyncOverridden__fetch.apply( this, toArray( arguments ) );
                }
            },

            reset: function(){
                this._syncingState = READY;
                collectionClass.prototype.__safeSyncOverridden__reset.apply( this, toArray( arguments ) );
            },

            isSynced: function(){
                return this._syncingState === SYNCED;
            },
        } );
    }
};
