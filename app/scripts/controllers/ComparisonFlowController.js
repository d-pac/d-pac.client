'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );
module.exports = Backbone.Model.extend( {

    defaults      : {
        state : "not ready"
    },
    contextEvents : {
        "route:assess:completed"  : function(){
            this.set( 'state', 'retrieving:comparison' );
        },
        "route:account:completed" : function(){
            this.set( 'state', 'ready' );
        }
    },

    initialize : function(){
        debug( 'ComparisonFlowController#initialize' );
        this.on( 'change:state', this.onChange );
        this.set('state', 'ready');
    },

    onChange : function(){
        this.dispatch( 'comparisonflow:changed:' + this.get( 'state' ) );
    }
} );
