'use strict';
const Marionette = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:uploads.views', '[UploadsOverview]' );
const tpl = require( './templates/UploadsOverview.hbs' );
const ItemView = require('./UploadsOverviewItem');

module.exports = Marionette.CompositeView.extend( {
    template: tpl,
    childView: ItemView,
    childViewContainer: 'tbody',

    initialize: function(){
        debug( '#initialize' );
    },

    // ui: {
    //     fileButtons: ".btn-file :file",
    //     saveButtons: ".save-btn",
    //     removeButtons: ".remove-btn"
    // },

    // events: {
    //     "change @ui.fileButtons": function( event ){
    //         const input = this.$( event.currentTarget );
    //         const filename = input.val().replace( /\\/g, '/' ).replace( /.*\//, '' );
    //         const toolbar = this.$( input.parent().parent() );
    //         const label = toolbar.find( '.label-file' );
    //         const submitButton = toolbar.find( '.save-btn' );
    //         const removeButton = toolbar.find( '.remove-btn' );
    //         if( filename ){
    //             label.html( filename );
    //             removeButton.show();
    //             submitButton.show();
    //         } else {
    //             submitButton.hide();
    //             removeButton.hide();
    //         }
    //     },
    //     "click @ui.saveButtons": function( event ){
    //         const button = this.$( event.currentTarget );
    //         const toolbar = this.$( button.parent() );
    //         const input = toolbar.find('input:file');
    //         const blob = input[0].files[0];
    //         const assessment = input.data('assessment');
    //         this.model.create(blob, assessment);
    //     },
    //
    //     "click @ui.removeButtons": function(event){
    //         const button = this.$( event.currentTarget );
    //         const toolbar = this.$( button.parent() );
    //         const label = toolbar.find( '.label-file' );
    //         label.html('');
    //         const submitButton = toolbar.find( '.save-btn' );
    //         submitButton.hide();
    //         button.hide();
    //     }
    // },
    //
    // serializeData: function(){
    //     const data = {
    //         items: this.model.toJSON()
    //     };
    //     return data;
    // }
} );
