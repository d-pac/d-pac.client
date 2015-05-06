'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:assess.views', '[SeqView]' );
var tpl = require( './templates/SeqView.hbs' );
var i18n = require( 'i18next' );

module.exports = Marionette.ItemView.extend( {
    phase: undefined,
    template: tpl,
    className: "col-md-8 col-md-offset-2 column",
    ui: {
        saveButton: ".save-button",
        valueButtons: ".value-buttons .btn"
    },
    events: {
        "click @ui.saveButton": "save",
        "click @ui.valueButtons": "valueClicked"
    },

    initialize: function( opts ){
        debug( "#initialize" );
        this.phase = opts.phase;
    },

    serializeData: function(){
        var data = this.model.toJSON();
        var defaultDescription = i18n.t( "assessment:comparisons.seq.default.description" );
        data.description = i18n.t( [
            "assessment:comparisons.seq." + this.phase.get( 'slug' ) + ".description", defaultDescription
        ] );
        return data;
    },

    onRender: function(){
        var selected = this.model.get( 'value' );
        if( selected ){
            this.$( "label[data-value='" + selected + "']" ).addClass( 'active' );
        }
        this.setButtonState( selected );
    },

    setButtonState: function( value ){
        this.$( this.ui.saveButton ).prop( 'disabled', !value );
    },

    getActiveValue: function(){
        return this.$( "label.active" ).attr( 'data-value' );
    },

    valueClicked: function( e ){
        this.setButtonState( this.$( e.currentTarget ).attr( 'data-value' ) );
    },

    save: _.debounce( function(){
        debug.debug( '#save' );
        this.model.set( {
            value: this.getActiveValue()
        } );
        this.trigger( "seq:edited" );
    }, 1000, true )
} );
