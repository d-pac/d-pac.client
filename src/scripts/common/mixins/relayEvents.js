'use strict';

var _ = require( 'lodash' );

module.exports.mixin = function( Constructor ){
    _.extend( Constructor.prototype, {
        relayEvents: function( from,
                               events,
                               to ){
            _.each( events, ( event )=>{
                if( _.isString( event ) ){
                    event = {
                        [event]: event
                    };
                }
                _.each( event, ( target,
                                 source )=>this.remapEvent( from, source, to, target ) );
            } );
        },
        remapEvent: function( from,
                              source,
                              to,
                              target ){
            from.vent.on( source, function(){
                to.dispatch.apply( to, [ target ].concat( _.toArray( arguments ) ) );
            } );
        },
    } );
};
