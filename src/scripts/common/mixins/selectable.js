'use strict';

var _ = require( 'lodash' );

module.exports.collection = {
    mixin: function( collectionClass ){
        collectionClass.prototype.__selectable_overridden__reset = collectionClass.prototype.reset;
        _.extend( collectionClass.prototype, {
            selectByID: function( id ){
                return this.select( this.get( id ) );
            },

            hasSelected: function(){
                return !!this.selected;
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
            },

            reset: function(){
                this.deselect();
                collectionClass.prototype.__selectable_overridden__reset.apply( this, _.toArray( arguments ) );
            }
        } );
    }
};
