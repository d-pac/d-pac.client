'use strict';

var _ = require( 'lodash' );

module.exports.mixin = function( mediatorClass ){
    _.extend( mediatorClass.prototype, {
        selectByID: function( id ){
            return this.select( this.get( id ) );
        },

        hasSelected: function(){
            return !! this.selected;
        },

        deselect: function( model ){
            if( !model || this.selected === model ){
                this.select( undefined );
            }
        },

        select: function( newValue ){
            var previous = this.selected;
            if( this.onDeselect ){
                this.onDeselect.call( this, previous );
            }
            this.selected = newValue;
            if( this.onSelect ){
                this.onSelect.call( this, this.selected, previous );
            }
            this.trigger( 'change:selected', this.selected, previous );
            return this.selected;
        }
    } );
};
