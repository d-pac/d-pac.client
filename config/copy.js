module.exports = {
    dist          : {
        files : [
            {
                expand : true,
                dot    : true,
                cwd    : '<%= config.app %>',
                dest   : '<%= config.dist %>',
                src    : [
                    '*.{ico,png,txt}',
                    '.htaccess',
                    'images/{,*/}*.webp',
                    '{,*/}*.html',
                    'styles/fonts/{,*/}*.*',
                    'locales/**/*.*',
                    'viewerjs/**',
                    'swf/**/*.*',
                    'scripts/core/config.json'
                ]
            }, {
                expand : true,
                dot    : true,
                cwd    : 'bower_components/bootstrap/dist',
                src    : ['fonts/*.*'],
                dest   : '<%= config.dist %>'
            }
        ]
    },
    styles        : {
        expand : true,
        dot    : true,
        cwd    : '<%= config.app %>/styles',
        dest   : '.tmp/styles/',
        src    : '{,*/}*.css'
    },
    viewerjs      : {
        expand : true,
        dot    : true,
        cwd    : '<%= config.bower %>/viewerjs',
        dest   : '<%= config.app %>/viewerjs',
        src    : '**'
    },
    zeroclipboard : {
        expand : true,
        dot    : true,
        cwd  : '<%=config.bower%>/zeroclipboard/dist',
        dest : '<%=config.app%>/swf',
        src  : '*.swf'
    }
};
