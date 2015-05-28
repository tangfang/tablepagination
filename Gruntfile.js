'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('bower.json'),
        banner: '/*\n' +
                '* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage : "" %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors %>\n' +
                '* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                '*/\n',
        // Task configuration.
        clean: ['dist', 'docs/dist'],
        concat: {
            basic_target: {
                src: ['src/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>-all.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            basic_target: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/<%=pkg.name %>.js']
                }
            }
        },
        copy: {
            source: {
                cwd: 'src',                     // set working folder / root to copy
                src: ['**/*.js', '**/*.html'],   // copy all files and subfolders
                dest: 'dist',                   // destination folder
                expand: true                    // required when using cwd
            },
            files: {
                cwd: 'dist',            // set working folder / root to copy
                src: '**/*',            // copy all files and subfolders
                dest: 'docs/dist',      // destination folder
                expand: true            // required when using cwd
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'uglify', 'copy']);
};
