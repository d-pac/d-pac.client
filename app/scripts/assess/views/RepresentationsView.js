'use strict';
var Marionette = require('backbone.marionette');
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationsView]' );
var tpl = require( './templates/RepresentationsView.hbs' );
var DetailView = require('./RepresentationDetailView');

module.exports = Marionette.LayoutView.extend({
    template : tpl,

    regions : {
        representationA : "#representation-A",
        representationB : "#representation-B"
    },

    initialize : function(){
        debug("#initialize");
    },

    onRender : function(){
        debug('#onRender', this.model);
        this.representationA.show(new DetailView({
            model: this.model.getRepresentation("a")
        }));
        this.representationB.show(new DetailView({
            model: this.model.getRepresentation("b")
        }));
    }
});
