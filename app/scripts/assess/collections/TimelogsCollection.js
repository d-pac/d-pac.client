'use strict';

var debug = require( 'debug' )( 'dpac:assess', '[TimelogsCollection]' );
var teardown = require( '../mixins/teardown' );

var ModelClass = require( '../models/TimelogProxy' );

module.exports = Backbone.Collection.extend( {

    url   : "/timelogs",
    model : ModelClass,
    contextEvents : {
        'assessment:teardown:requested' : "teardown",
        'AuthService:signout:requested' : "stop"
    },

    initialize : function( models, opts ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );

        opts = _.defaults({}, opts, {
            interval : 5000,
            shortcut : 'ctrl+alt+s'
        });
        this.updateInterval = opts.interval;
        this.autoUpdateDisabled = false;

        var self = this;
        Mousetrap.bind(opts.shortcut, function(){
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
            }.bind(this), this.updateInterval );
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

    stop : function(){
        debug.debug( 'stop' );
        var model = this.selected;
        if(model){
            this._stopUpdate();
            this.deselect();
            model
                .update();
            this.remove(model);
        }
        return model;
    },

    onTeardown : function(){
        debug("#teardown");
        this.stop();

        Mousetrap.unbind('ctrl+alt+s');
    }

} );
teardown.collection.mixin( module.exports );
