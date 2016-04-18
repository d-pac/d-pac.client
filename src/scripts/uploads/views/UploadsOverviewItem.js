'use strict';

const Marionette = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:uploads.views', '[UploadsOverviewItem]' );
const tpl = require( './templates/UploadsOverviewItem.hbs' );

function stripPath( str ){
    if( str ){
        return str.replace( /\\/g, '/' ).replace( /.*\//, '' );
    }
}

module.exports = Marionette.ItemView.extend( {
    tagName: "tr",
    template: tpl,

    modelEvents: {
        "change:representation": "render"
    },

    ui: {
        saveBtn: ".save-btn",
        removeBtn: ".remove-btn",
        browseBtn: ".browse-btn",
        fileLabel: ".file-label",
        fileInput: ".btn-file :file"
    },

    events: {
        "click @ui.saveBtn": function(){
            const file = this.ui.fileInput[ 0 ].files[ 0 ];
            const assessment = this.ui.fileInput.data( 'assessment' );
            this.model.save( {
                file: file,
                assessment: assessment
            } );
        },
        "click @ui.removeBtn": function(){
            this.ui.fileInput.val( '' );
            this.determineState();
        },
        "change @ui.fileInput": function(){
            this.determineState();
        }
    },

    initialize: function(){
        debug( '#initialize' );
    },

    onRender: function(){
        this.determineState();
    },

    determineState: function(){
        debug( '#determineState' );
        if( this.model.uploadingEnabled() ){
            const selectedFile = stripPath( this.ui.fileInput.val() );
            this.ui.fileLabel.val( selectedFile );
            if( selectedFile ){
                this.ui.removeBtn.show();
                this.ui.saveBtn.show();
                this.trigger( 'file:selected', selectedFile );
            } else {
                this.ui.removeBtn.hide();
                this.ui.saveBtn.hide();
                this.trigger( 'file:deselected' );
            }
        // } else {
        //     // this.ui.browseBtn.attr( 'disabled', 'disabled' );
        //     // this.ui.browseBtn.tooltip({title: "Not allowed"});
        //     // this.ui.fileInput.prop( 'disabled', true );
        //     this.ui.browseBtn.hide();
        //     this.ui.removeBtn.hide();
        //     this.ui.saveBtn.hide();
        }
    },

} );
