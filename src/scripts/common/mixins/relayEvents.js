'use strict';

var _ = require( 'lodash' );

module.exports.mixin = function( mediatorClass ){
    _.extend( mediatorClass.prototype, {
        relayEvents: function( from,
                               events,
                               to ){
            _.each( events, function( event ){
                if( _.isString( event ) ){
                    this.remapEvent( from, event, to, event );
                } else {
                    var source = event[ 0 ];
                    var target = event[ 1 ];
                    this.remapEvent( from, source, to, target );
                }
            }, this );
        },
        remapEvent: function(from, source, to, target){
            from.vent.on( source, function(){
                to.dispatch.apply( to, [ target ].concat( _.toArray( arguments ) ) );
            } );
        },
    } );
};
