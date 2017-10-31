'use strict';
const {isArray} = require('lodash');
const {Collection} = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:common.collections', '[UsersCollection]' );
const teardown = require( '../../common/mixins/teardown' );
const ModelClass = require( '../models/UserProxy' );

module.exports = Collection.extend( {
    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    },

    fetchAssessors: function( assessment, opts ){
        this.url = '/assessments/'+ assessment.id + '/assessor';
        this.fetch(opts);
    },

    addRemoved: function(models){
        if(!isArray(models)){
            models = [models];
        }
        models.forEach((m)=>{
            Object.assign(m,{
                name:{
                    first: "<removed",
                    last: "from assessment>"
                },
                email: "N/A"
            });
        });
        this.add(models);
    }
} );
teardown.collection.mixin( module.exports );
