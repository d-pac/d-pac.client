'use strict';

module.exports = {
    url: function(){
        return this.api.launchUrl + '/#signout';
    },
    elements: {
        "empty": "this page has no elements, but we need to provide the `elements` property to nightwatch"
    }
};
