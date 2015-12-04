'use strict';

var _ = require( 'lodash' );

module.exports.mixin = function( mediatorClass ){
    _.extend( mediatorClass.prototype, {
        selectByID: function( assessmentId ){
            return this.select( this.get( assessmentId ) );
        },

        deselect: function( model ){
            if( !model || this.selected === model ){
                this.select( undefined );
                return model;
            }
        },

        select: function( model ){
            this.selected = model;
            return model;
        },
    } );
};
