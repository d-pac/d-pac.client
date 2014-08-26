'use strict';
module.exports = function loadLocalizedHBS( scope,
                                            name,
                                            template,
                                            data ){
    $.ajax( {
        url     : 'locales/' + $.i18n.lng() + '/' + name + '.hbs', //ex. js/templates/mytemplate.handlebars
        cache   : true,
        success : function( source ){
            Handlebars.registerPartial( name, source );
            var tpl = Handlebars.compile( template );
            scope.$el.html( tpl( data ) );
        }
    } );
};
