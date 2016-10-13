'use strict';
const {ItemView} = require( 'backbone.marionette' );

const debug = require( 'debug' )( 'dpac:results.views', '[AssessmentOverview]' );
const tpl = require( './templates/AssessmentOverview.hbs' );

module.exports = ItemView.extend( {
    className: "column col-sm-12",
    template: tpl,
    initialize: function(){
        debug( '#initialize', this.cid );
    },

    serializeData: function(){
        return this.collection.selected.toJSON();
    }
} );
