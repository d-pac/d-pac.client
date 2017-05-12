'use strict';

const {extend} = require( 'lodash' );

module.exports = {
    mixin: function( Constructor ){
        if( Constructor.prototype.reset && ! Constructor.prototype.__selectable_overridden__reset){
            Constructor.prototype.__selectable_overridden__reset = Constructor.prototype.reset;
            Constructor.prototype.reset = function(...args){
                this.deselect();
                Constructor.prototype.__selectable_overridden__reset.apply( this, args );
            }
        }
        if(Constructor.prototype.clear && ! Constructor.prototype.__selectable_overridden__clear){
            Constructor.prototype.__selectable_overridden__clear = Constructor.prototype.clear;
            Constructor.prototype.clear = function(...args){
                this.deselect();
                Constructor.prototype.__selectable_overridden__clear.apply( this, args );
            }
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
                const previous = this.selected;
                if( previous && this.onDeselect ){
                    this.onDeselect( previous );
                }
                this.selected = newValue;
                if( this.onSelect ){
                    this.onSelect( this.selected, previous );
                }
                this.trigger( 'change:selected', this.selected, previous );
                return this.selected;
            }
        } );
    }
};
