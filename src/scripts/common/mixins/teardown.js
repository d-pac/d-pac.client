'use strict';
var _ = require( 'lodash' );

module.exports.collection = {

    mixin : function( collectionClass ){

        _.extend(collectionClass.prototype, {
            teardown : function(){
                if( !this._teardown_completed ){
                    this._teardown_completed = true;
                    var callback;
                    this.sync = _.noop;
                    if( this.onTeardown ){
                        callback = this.onTeardown();
                    }
                    this.forEach( function( model ){
                        if( model.teardown ){
                            model.teardown();
                        }
                    } );
                    this.reset();
                    this.stopListening();
                    if( callback ){
                        callback.call( this );
                    }
                }
            }
        });

    }
};

module.exports.model = {
    mixin : function( modelClass ){
        _.extend(modelClass.prototype, {
            teardown : function(){
                if( !this._teardown_completed ){
                    this._teardown_completed = true;
                    var callback;
                    this.sync = this.save = this.fetch = this.destroy = _.noop;
                    if( this.onTeardown ){
                        callback = this.onTeardown();
                    }
                    this.stopListening();
                    this.clear( { silent : true } );
                    if( callback ){
                        callback.call( this );
                    }
                }
            }
        });
    }
};
