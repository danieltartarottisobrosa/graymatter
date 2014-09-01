
module.exports = function( grunt ) {

  // Config tasks
  grunt.initConfig({

    concat: {
      options: {
        separator: "\n\n\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/" +
            "\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n\n",
      },
      dist: {
        src: [
          "build/header.js",
          "src/**/*.js",
          "build/footer.js"
        ],
        dest: 'dist/graymatter.js'
      }
    },

    uglify: {
      dist: {
        files: {
          "dist/graymatter.min.js": [ "dist/graymatter.js" ]
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [ "test/**/*-test.js" ]
      }
    },

    jsdoc : {
      dist : {
        src: "src/**/*.js",
        options: {
          destination: "docs"
        }
      }
    },

    watch: {
      files: [ "Gruntfile.js", "lib/**/*", "src/**/*", "test/**/*", "build/**/*" ],
      tasks: [ "default" ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks( "grunt-contrib-concat" );
  grunt.loadNpmTasks( "grunt-contrib-uglify" );
  grunt.loadNpmTasks( "grunt-mocha-test" );
  grunt.loadNpmTasks( "grunt-jsdoc" );
  grunt.loadNpmTasks( "grunt-contrib-watch" );

  // Register tasks
  grunt.registerTask( "default", [ "concat", "uglify", "mochaTest" ] );
  grunt.registerTask( "docs", [ "jsdoc" ] );

};