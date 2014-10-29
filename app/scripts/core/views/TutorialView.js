'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[TutorialView]' );
var tpl = require( './templates/Tutorial.hbs' );
var popoverTpl = require( './templates/TutorialPopover.hbs' );

module.exports = Marionette.ItemView.extend( {
    template   : tpl,
    initialize : function(){
        debug( "#initialize" );
        this.alive=true;
        this.tour = new Tour( {
            steps           : [
                {
                    element   : "#explanation",
                    title     : i18n.t("tutorial:steps.assessment.title"),
                    content   : i18n.t("tutorial:steps.assessment.description"),
                    placement : "top"
                },
                {
                    element   : "#representations",
                    title     : i18n.t("tutorial:steps.representations.title"),
                    content   : i18n.t("tutorial:steps.representations.description"),
                    placement : "top"
                },
                {
                    element   : "#judgements",
                    title     : i18n.t("tutorial:steps.notes.title"),
                    content   : i18n.t("tutorial:steps.notes.description"),
                    placement : "top"
                },
                {
                    element   : "#selection-buttons",
                    title     : i18n.t("tutorial:steps.select.title"),
                    content   : i18n.t("tutorial:steps.select.description"),
                    placement : "bottom"
                },
                {
                    title     : i18n.t("tutorial:steps.questions.title"),
                    content   : i18n.t("tutorial:steps.questions.description"),
                    orphan  : true
                },
                {
                    title     : i18n.t("tutorial:steps.thanks.title"),
                    content   : i18n.t("tutorial:steps.thanks.description"),
                    orphan  : true
                }
            ],
            storage         : false,
            backdrop        : true,
            backdropPadding : 4,
            template        : popoverTpl(),
            onEnd        : this.endTour.bind( this )
        } );

    },

    endTour : function(){
        if(this.alive){
            this.tour.restart();
        }
    },

    onRender : function(){
        var tour = this.tour;
        _.delay( function(){
            tour.init();
            tour.start();
        }, 1000 );
    },

    onBeforeDestroy: function(){
        debug('#onBeforeDestroy');
        this.alive=false;
        this.tour.end();
        this.tour = undefined;
    }
} );
