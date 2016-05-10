'use strict';

var _ = require( 'lodash' );

module.exports.collection = {
    mixin: function( Constructor ){
        if( Constructor.prototype.reset ){
            Constructor.prototype.__selectable_overridden__reset = Constructor.prototype.reset;
        }
        _.extend( Constructor.prototype, {
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
                if( Constructor.prototype.__selectable_overridden__reset ){
                    Constructor.prototype.__selectable_overridden__reset.apply( this, _.toArray( arguments ) );
                }
            }
        } );
    }
};
