'use strict';

const {each, toArray} = require( 'lodash' );

module.exports.mixin = function( Constructor ){
    return {
        propagate: function propagate( events ){
            Constructor.prototype.__propagateEvents_overridden__initialize = Constructor.prototype.initialize;
            Constructor.prototype.initialize = function(){
                var instance = this;
                each( events, function( to,
                                          from ){
                    instance.listenTo( instance, from, function(){
                        instance.dispatch( to, toArray( arguments ) );
                    } );
                } );
                Constructor.prototype.__propagateEvents_overridden__initialize.apply( this, toArray( arguments ) );
            };
        }
    };
};
