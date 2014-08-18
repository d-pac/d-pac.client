'use strict';


var AppView = require('../views/AppView');

module.exports = function BootstrapUI(){
    var appView = new AppView();
    appView.render();
};
