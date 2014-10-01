'use strict';

var loadLocalizedHBS = require('../helpers/loadLocalizedHBS');
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/templates/Welcome.hbs', 'utf8');

module.exports = Marionette.ItemView.extend({

    template : false,

    render : function(){
        loadLocalizedHBS(this, 'welcome', template);
        return this;
    }
});
