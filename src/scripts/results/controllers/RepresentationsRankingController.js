'use strict';
const {get, kebabCase} = require( 'lodash' );
const {Model} = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:results.controllers', '[RepresentationsRankingController]' );

module.exports = Model.extend( {
    authorization: undefined,
    assessments: undefined,
    representations: undefined,

    _parsed: false,

    defaults: {
        assessment: undefined,
        representations: []
    },

    initialize: function(){
        debug('#initialize');
        this.listenTo( this.representations, 'sync', ()=>{
            this.parseData();
            this.trigger( 'sync' );
        } );
    },

    fetchForAssessment: function(assesment){
        this.representations.fetchForAssessment(assesment);
    },

    parseData: function(){
        const assessment = this.assessments.selected;
        const isAllowedToViewOthers = this.authorization.isAllowedToViewOthers( assessment );
        const user = this.authorization.getUser();
        const statsByRepresentation = assessment.get( 'stats' ).byRepresentation;
        const n = this.representations.length;
        let i = 0;
        const ownedRepresentations = [];
        const collection = this.representations
            .sortBy( function( model ){
                return model.get( 'ability.value' );
            } )
            .map( ( model )=>{
                const ability = Number( model.get( 'ability.value' ) );
                const rse = Number( model.get( 'ability.se' ) );
                const se = Math.min( rse, 3 );
                model.set( {
                    rank: n - i,
                    comparisonsNum: get( statsByRepresentation, [ model.id, 'comparisonsNum' ], 0 )
                } );
                const owned = model.isOwnedBy( user );
                if( owned ){
                    ownedRepresentations.push( model );
                }
                const p = {
                    comparisonsNum: model.get( 'comparisonsNum' ),
                    name: model.get( 'name' ),
                    rank: model.get( 'rank' ),
                    anonymized: model.get('anonymized'),
                    ability: ability,
                    rse: rse,
                    se: se,
                    x: ++i,
                    y: ability,
                    id: model.id,
                    classes: [ 'representation-' + kebabCase( model.get( 'rankType' ) ) ],
                    rankType: model.get( 'rankType' ),
                    emphasis: owned,
                    selectable: owned || isAllowedToViewOthers
                };
                return p;
            } );
        if( ownedRepresentations.length ){
            const representation = ownedRepresentations[ ownedRepresentations.length - 1 ];
            this.selectRepresentation( representation.id, true );
        }
        this.set( {
            assessment: assessment.toJSON(),
            representations: collection
        } );
    },

    toJSON: function(...args){
        if( !this._parsed ){
            this._parsed = true;
            this.parseData();
        }

        return Model.prototype.toJSON.apply( this, args );
    },

    selectRepresentation: function( id, internal ){
        const model = this.representations.selectByID( id );
        if(model){
            this.dispatch( "results:representation:selected", {
                representation: model,
                triggeredByUser: !internal
            } );
        }
        return model;
    },

    getSelectedRepresentationId: function(){
        return get( this.representations, ['selected', 'id']);
    },

    getLength: function(){
        return this.representations.length;
    }
} );
