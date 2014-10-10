'use strict';

module.exports.collection = {
    mixin : function( collection,
                      callback ){
        collection.teardown = function(){
            this.trigger( 'teardown:pre' );
            this.stopListening();
            this.once( 'reset', function( collection,
                                          opts ){
                _.each( opts.previousModels, function( model ){
                    model.teardown();
                } );
            } );
            this.reset();
            this.trigger( 'teardown:post' );
            if( callback ){
                callback();
            }
        }.bind( collection );

    }
};

module.exports.model = {
    mixin : function( model,
                      callback ){
        model.teardown = function(){
            this.stopListening();
            this.clear( { silent : true } );
        }.bind(model);
    }
};
