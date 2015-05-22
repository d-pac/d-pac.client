'use strict';
var Backbone = require('backbone');
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
        var now = moment().format();
        this.set('begin', now);
        this.set('end', now);

        this.save();
    },

    parse: function(raw){
        return raw.data;
    },

    update: function(){
        debug("#update", this.id || '<new>');
        var now = moment().format();
        this.save({
            end: now
        }, {patch:true});

        return this;
    }
} );
teardown.model.mixin( module.exports );
