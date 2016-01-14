'use strict';
var _ = require( 'lodash' );

module.exports.collection = {
    mixin: function( collectionClass ){
        collectionClass.prototype.__safeSyncOriginal__fetch = collectionClass.prototype.fetch;
        _.extend( collectionClass.prototype, {
            fetch: function(){
                if( !this._syncing ){
                    var args = _.toArray( arguments );
                    this._syncing = true;
                    this.once( 'sync', function(){
                        this._syncing = false;
                    }, this );
                    collectionClass.prototype.__safeSyncOriginal__fetch.apply( this, args );
                }
            },
            isSynced: function(){
                return !this._syncing;
            },
        } )
    }
};
