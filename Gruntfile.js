module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            separator: ','
        },
        dist: {
            src: ['src/**/*.js'],
            dest: 'dist/<%= pkg.name %>.js'
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/*.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    debug: true
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/css/style.css': 'src/sass/style.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['src/sass/**/*.scss'],
                tasks:['sass']
            }
        },
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "src/scss/*.scss",
                        "dist/css/*.css",
                        "*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,svg}'],
                    dest: 'dist/img/'
                }]
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }, {
                        removeAttrs: {
                            attrs: ['xmlns']
                        }
                    }
                ]
            },
            dist: {
                files: {
                    'dist/*.svg': 'src/img/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['browserSync', 'watch', 'imagemin', 'svgmin']);
};