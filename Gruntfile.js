module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        concat: {
            basic: {
                src: ['src/app.js', 'src/controller.js', 'src/filters.js'],
                dest: 'ng-date-repeat.js',
            }
        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            },
            main: {
                files: {
                    "ng-date-repeat.min.js": "ng-date-repeat.js"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.registerTask("default", ["concat", "uglify"]);
};
