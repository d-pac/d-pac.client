'use strict';

var moment = require('moment');
var debug = require( 'debug' )( 'dpac:assess', '[TimelogProxy]' );
var teardown = require('../mixins/teardown');
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",

    defaults    : {
        comparison : undefined, //{Comparison.id}
        phase      : undefined, //{Phase.id}
        begin      : undefined, //{String}
        end        : undefined //{String}
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Backbone.Select.Me.applyTo( this );

        var now = moment().format();
        this.set('begin', now);
        this.set('end', now);

        this.save();
    },

    update: function(){
        debug("#update", this.id || '<new>');
        var now = moment().format();
        this.set('end', now);

        this.save();

        return this;
    },

    onTeardown : function(){
        debug( "#teardown", this.id || '<new>' );
        this.deselect( { silent : true } );
    }
} );
teardown.model.mixin( module.exports );
