module.exports = {
    js         : {
        files   : ['<%= config.app %>/scripts/**/*.js'],
        tasks   : ['webpack'],
        options : {
            livereload : true
        }
    },
    hbs : {
        files : [ '<%= config.app %>/**/*.hbs'],
        tasks : ['webpack'],
        options : {
            livereload : true
        }
    },
    jstest     : {
        files : ['test/spec/{,*/}*.js'],
        tasks : ['test:watch']
    },
    gruntfile  : {
        files : ['Gruntfile.js']
    },
    less : {
        files : ['<%= config.app %>/styles/{,*/}*.less'],
        tasks : ['less']
    },
    styles     : {
        files : ['.tmp/styles/{,*/}*.css'],
        tasks : ['newer:copy:styles', 'autoprefixer']
    },
    livereload : {
        options : {
            livereload : '<%= connect.options.livereload %>'
        },
        files   : [
            '<%= config.app %>/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/images/{,*/}*'
        ]
    }
};
