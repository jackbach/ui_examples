module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-pages');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-ssh');

  grunt.initConfig({
    less: {
      compile: {
        files: {
          'public/styles.css': 'src/stylesheets/styles.less'
        }
      }
    },

    jade: {
      compile: {
        files: [{
            expand: true,
            cwd: 'src/jades',
            src: '*.jade',
            dest: 'public',
            ext: '.html'
        }]
      }
    },

    watch: {
      pages: {
        files: [
          'src/jades/**/*.jade',
          'posts/*.md'
        ],
        tasks: ['pages']
      },
      less: {
        files: ['src/stylesheets/**/*.{less,css}'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public'
        }
      }
    },

    pages: {
      options: {
        pageSrc: 'src/jades/pages'
      },
      posts: {
        src: 'posts',
        dest: 'public',
        layout: 'src/jades/layouts/base.jade',
        url: 'blog/:title/'
      }
    }

  });

  grunt.registerTask('default', ['connect', 'less', 'pages', 'watch']);
};
