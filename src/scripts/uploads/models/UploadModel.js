'use strict';

const {Model} = require('backbone');
const debug = require('debug')('dpac:uploads.models', '[UploadModel]');
const Representation = require('../../common/models/RepresentationProxy');
const selectable = require( '../../common/mixins/selectable' );

module.exports = Model.extend({
    representationsCollection: undefined,
    idAttribute: "_id",

    defaults: {
        assessment: undefined
    },

    initialize(attrs){
        debug('#initialize');
        if(attrs.representation){
            this.select(attrs.representation);
        }
    },

    save(attrs, opts){
        debug('#save');
        let representation = this.selected;
        if (!representation) {
            representation = new Representation();
            this.representationsCollection.add(representation);
            //add to collection
        }
        representation.once('change', (model) => {
            console.log('SEND OUT CHANGE:REPRESENTATION');
            this.select(representation);
        });
        representation.update(attrs);
    },

    uploadingEnabled: function () {
        const assessment = this.get('assessment');
        const representation = this.selected;
        const isCompared =  (representation) ? representation.get('isInComparison') : false;
        return assessment.uploadingAllowed(isCompared);
    },

    toJSON(){
        const representation = this.selected;
        const uploadingEnabled = this.uploadingEnabled();
        return {
            assessment: this.get('assessment').toJSON(),
            representation: (representation) ? representation.toJSON() : undefined,
            uploadingEnabled: uploadingEnabled
        };
    }
});
selectable.mixin( module.exports );
