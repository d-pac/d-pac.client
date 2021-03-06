'use strict';
const {ItemView} = require( 'backbone.marionette' );

const debug = require( 'debug' )( 'dpac:results.views', '[AssessmentOverview]' );
const emptyTpl = require('./templates/Loading.hbs');
const contentTpl = require( './templates/AssessmentOverview.hbs' );

module.exports = ItemView.extend( {
    getTemplate: function(){
        if (this.model.has('assessment')){
            return contentTpl;
        }
        return emptyTpl;
    },

    modelEvents: {
        "change:assessment": 'render'
    },

} );
