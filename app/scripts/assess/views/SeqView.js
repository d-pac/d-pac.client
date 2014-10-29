'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[SeqView]' );
var tpl = require( './templates/SeqView.hbs' );

module.exports = Marionette.ItemView.extend( {
    phase : undefined,
    template : tpl,
    className: "col-md-8 col-md-offset-2 column",
    ui       : {
        saveButton : ".save-button",
        valueButtons : ".value-buttons .btn"
    },
    events : {
        "click @ui.saveButton" : "save"
    },

    initialize : function(opts){
        debug( "#initialize" );
        this.phase = opts.phase;
    },

    serializeData : function(){
        var data = this.model.toJSON();
        var defaultDescription = i18n.t("assessment:comparisons.seq.default.description");
        data.description = i18n.t(["assessment:comparisons.seq." + this.phase.get('slug') + ".description", defaultDescription]);
        return data;
    },

    onRender   : function(){
        var selected  = this.model.get('value');
        if(selected){
            this.$("label[data-value='"+ selected + "']" ).addClass('active');
        }
    },

    save : _.debounce(function(){
        debug.debug('#save');
        this.model.set({
            value : this.$("label.active" ).attr('data-value')
        });
        this.trigger("seq:edited");
    }, 1000, true)
} );
