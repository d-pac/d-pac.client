'use strict';

var debug = require( 'debug' )( 'dpac:assess', '[ProgressModel]' );
module.exports = Backbone.Model.extend( {
    defaults : {
        comparisonsNum : 0,
        completedNum   : 0,
        percentage     : 0
    },

    initialize : function( attrs ){
        debug( '#initialize', this.id || '<new>' );
        this.set( 'percentage', Math.round(attrs.completedNum / attrs.comparisonsNum * 100) );
    },

    isCompleted : function(){
        return this.get( 'completedNum' ) >= this.get( 'comparisonsNum' );
    }
} );
