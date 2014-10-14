'use strict';

var debug = require( 'debug' )( 'dpac:assess', '[TimelogsCollection]' );
var teardown = require( '../mixins/teardown' );

var ModelClass = require( '../models/TimelogProxy' );

module.exports = Backbone.Collection.extend( {

    url   : "/timelogs",
    model : ModelClass,
    contextEvents : {
        'assessment:teardown:requested' : "teardown"
    },

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );

        this.autoUpdateDisabled = false;

        var self = this;
        Mousetrap.bind('ctrl+alt+s', function(){
            self.autoUpdateDisabled = ! self.autoUpdateDisabled;
            debug.warn('Toggling auto update to ', !self.autoUpdateDisabled);
            if(self.autoUpdateDisabled){
                self._stopUpdate();
            }else{
                self._autoUpdate(self.selected);
            }
        });
    },

    _autoUpdate : function( model ){
        if( model && !this.autoUpdateDisabled ){
            this.intervalId = setInterval( function(){
                model.update();
            }, 5000 );
        }
    },

    _stopUpdate : function(){
        if( this.intervalId ){
            clearInterval( this.intervalId );
        }
    },

    start : function( attrs ){
        debug.debug( 'start', attrs );
        var model = this.add( attrs );
        this.select( model );
        this._autoUpdate( model );
        return model;
    },

    stop : function( attrs ){
        debug.debug( 'stop', attrs );
        this._stopUpdate();
        var model = this.selected;
        this.deselect();
        model
            .update()
            .teardown();
        return this.remove(model);
    },

    onTeardown : function(){
        debug("#teardown");
        this._stopUpdate();
        this.deselect( this.selected, { silent : true } );

        Mousetrap.unbind('ctrl+alt+s');
    }

} );
teardown.collection.mixin( module.exports );
