'use strict';

module.exports.collection = {

    mixin : function( collectionClass ){

        _.extend(collectionClass.prototype, {
            _teardown_completed : false,

            teardown : function(){
                if( !this._teardown_completed ){
                    this._teardown_completed = true;
                    var callback;
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
            _teardown_completed : false,
            teardown : function(){
                if( !this._teardown_completed ){
                    this._teardown_completed = true;
                    var callback;
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
