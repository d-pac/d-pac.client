'use strict';

const {extend, toArray} = require( 'lodash' );

module.exports.collection = {
    mixin: function( Constructor ){
        if( Constructor.prototype.reset ){
            Constructor.prototype.__selectable_overridden__reset = Constructor.prototype.reset;
        }
        extend( Constructor.prototype, {
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
                if( previous && this.onDeselect ){
                    this.onDeselect( previous );
                }
                this.selected = newValue;
                if( this.onSelect ){
                    this.onSelect( this.selected, previous );
                }
                this.trigger( 'change:selected', this.selected, previous );
                return this.selected;
            },

            reset: function(){
                this.deselect();
                if( Constructor.prototype.__selectable_overridden__reset ){
                    Constructor.prototype.__selectable_overridden__reset.apply( this, toArray( arguments ) );
                }
            }
        } );
    }
};
