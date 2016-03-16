'use strict';
var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:core', '[PermissionsModel]' );
var permissions = require( './Permissions' );

module.exports = Backbone.Model.extend( {
    authentication: undefined,
    assessments: undefined,

    guards: {
        "assess.view": function(){
            var user = this.authentication.get( 'user' );
            var asAssessor = _.get( user, [ 'assessments', 'assessor' ], [] );
            return (asAssessor.length > 0)
                ? permissions.flags.allowed.value
                : permissions.flags.hidden.value;
        },
        "results.view": function(){
            var user = this.authentication.get( 'user' );
            var asAssessee = _.get( user, [ 'assessments', 'assessee' ], [] );
            var asAssessor = _.get( user, [ 'assessments', 'assessor' ], [] );
            var asPAM = _.get( user, [ 'assessments', 'pam' ], [] );
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
            var user = this.authentication.get( 'user' );
            return (_.get(user, ['isAdmin'], false))
                ? permissions.flags.allowed.value
                : permissions.flags.hidden.value;
        }
    },

    initialize: function( attrs ){
        debug( '#initialize', this.id || '<new>' );
    },

    toJSON: function(){
        var model = this;
        var flattened = _.merge( {}, permissions.defaults, function( unused,
                                                                     value,
                                                                     name ){
            var guard = model.guards[ name ];
            if( guard ){
                value = Math.min( guard.call( model ), value );
            }
            return value;
        } );

        return _.reduce( flattened, function( memo,
                                              value,
                                              key ){
            var label = _.get( permissions, [ "flags", value, "label" ], permissions.flags.hidden.label );
            if( !memo[ label ] ){
                memo[ label ] = {};
            }
            _.set( memo.flags, key, label );
            _.set( memo[ label ], key, true );
            return memo;
        }, { flags: {} } );
    },

    isAllowed: function(path){
        var obj = this.toJSON();
        return _.get(obj.flags, path) === permissions.flags.allowed.label;
    },

    isHidden: function(path){
        var obj = this.toJSON();
        return _.get(obj.flags, path) === permissions.flags.hidden.label;
    },

    isDisabled: function(path){
        var obj = this.toJSON();
        return _.get(obj.flags, path) === permissions.flags.disabled.label;
    }
} );
