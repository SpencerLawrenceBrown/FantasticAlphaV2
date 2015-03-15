module.exports = function (grunt){
	grunt.initConfig({
		concat:{
			options: {
				process: function(src, filepath) {
					return '//####' + filepath + '\n' + src;
    			}
			},
			dist: {
				//The files to concatenate
				src: ['public/modules/**/*.js'],
				dest: 'public/dist/fantastic.js'
			}
		},
		uglify: {
			options: {
				//banner for top of output
				 banner: '/*! Fantastic Alpha <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'public/dist/fantastic.min.js' : ['public/dist/fantastic.js']
				}
			}
		},
		less: {
			development: {
				options: {
					paths: ['public/css']
				},
				files:{
					'public/css/main.css': 'public/css/styles.less'
				}
			}
		},
		watch: {
			css: {
				files: ['public/css/*.less'],
				tasks: ['less']
			},
			js: {
				files: ['public/modules/**/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ["concat","less", "watch", "uglify"]);
};