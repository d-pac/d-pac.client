'use strict';
var debug = require( 'bows' )( 'dpac:commands' );
var SetupAPIRequests = module.exports = function SetupAPIRequests(){
};

_.extend(SetupAPIRequests.prototype, {
    wiring : ['config'],

    execute  : function(){
        debug('SetupAPIRequests');
        var config = this.config;
        $.ajaxPrefilter( function( options, originalOptions, jqXHR ){
            if(options.api){
                options.url = config.api.root + options.url;
            }
        });
    }
})
