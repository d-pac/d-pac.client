'use strict';
const {get, merge, reduce, set} = require( 'lodash' );
const {Model} = require( 'backbone' );

const debug = require( 'debug' )( 'dpac:core', '[PermissionsModel]' );
const permissions = require( './Permissions' );

module.exports = Model.extend( {
    authentication: undefined,
    assessments: undefined,

    guards: {
        "assess.view": function(){
            const user = this.getUser();
            const asAssessor = get( user, [ 'assessments', 'assessor' ], [] );
            return (asAssessor.length > 0)
                ? permissions.flags.allowed.value
                : permissions.flags.hidden.value;
        },
        "results.view": function(){
            const user = this.getUser();
            const asAssessee = get( user, [ 'assessments', 'assessee' ], [] );
            const asAssessor = get( user, [ 'assessments', 'assessor' ], [] );
            const asPAM = get( user, [ 'assessments', 'pam' ], [] );
            return (asAssessee.length > 0 || asAssessor.length > 0 || asPAM.length > 0)
                ? permissions.flags.allowed.value
                : permissions.flags.hidden.value;
        },
        "account.view": function(){
            return (this.authentication.get( 'authenticated' ))
                ? permissions.flags.allowed.value
                : permissions.flags.hidden.value;
        },
        "admin.view": function(){
            const user = this.getUser();
            return (get( user, [ 'isAdmin' ], false ))
                ? permissions.flags.allowed.value
                : permissions.flags.hidden.value;
        },
        "uploads.view": function(){
            const user = this.getUser();
            const asAssessee = get( user, [ 'assessments', 'assessee' ], [] );
            return asAssessee.length > 0
                ? permissions.flags.allowed.value
                : permissions.flags.hidden.value;
        }
    },

    initialize: function( attrs ){
        debug( '#initialize', this.id || '<new>' );
    },

    toJSON: function(){
        const model = this;
        const flattened = merge( {}, permissions.defaults, function( unused,
                                                                     value,
                                                                     name ){
            const guard = model.guards[ name ];
            if( guard ){
                value = Math.min( guard.call( model ), value );
            }
            return value;
        } );

        return reduce( flattened, function( memo,
                                              value,
                                              key ){
            const label = get( permissions, [ "flags", value, "label" ], permissions.flags.hidden.label );
            if( !memo[ label ] ){
                memo[ label ] = {};
            }
            set( memo.flags, key, label );
            set( memo[ label ], key, true );
            return memo;
        }, { flags: {} } );
    },

    isAllowed: function( path ){
        const obj = this.toJSON();
        return get( obj.flags, path ) === permissions.flags.allowed.label;
    },

    isHidden: function( path ){
        const obj = this.toJSON();
        return get( obj.flags, path ) === permissions.flags.hidden.label;
    },

    isDisabled: function( path ){
        const obj = this.toJSON();
        return get( obj.flags, path ) === permissions.flags.disabled.label;
    },

    getHighestRole: function(id){
        const user = this.getUser();
        if(get( user, [ 'assessments', 'pam' ], [] ).indexOf(id)>=0){
            return 'pam';
        }
        if(get( user, [ 'assessments', 'assessor' ], [] ).indexOf(id)>=0){
            return 'assessor';
        }
        if(get( user, [ 'assessments', 'assessee' ], [] ).indexOf(id)>=0){
            return 'assessee';
        }
        return undefined;
    },

    getLowestRole: function(id){
        const user = this.getUser();
        if(get( user, [ 'assessments', 'assessee' ], [] ).indexOf(id)>=0){
            return 'assessee';
        }
        if(get( user, [ 'assessments', 'assessor' ], [] ).indexOf(id)>=0){
            return 'assessor';
        }
        if(get( user, [ 'assessments', 'pam' ], [] ).indexOf(id)>=0){
            return 'pam';
        }
        return undefined;
    },

    isAllowedToViewRanking: function(assessment){
        const role = this.getHighestRole(assessment.id || assessment._id);
        if(role === 'assessee'){
            return !!assessment.get('results.assessees.viewRanking');
        }
        return !!role;
    },

    isAllowedToViewOthers: function(assessment){
        const role = this.getLowestRole(assessment.id || assessment._id); // temporary fix
        if(role === 'assessee'){
            return !!assessment.get('results.assessees.viewRepresentations');
        }
        return !!role;
    },

    isAllowedToViewAssessorsList: function (assessment) {
        const role = this.getHighestRole(assessment.id || assessment._id);
        return role === "pam"
    },

    isAllowedToViewRepresentationsList: function (assessment) {
        const role = this.getHighestRole(assessment.id || assessment._id);
        console.log("role for", assessment, role);
        return role === "pam"
    },

    getUser: function(){
        return this.authentication.get( 'user' );
    }
} );
