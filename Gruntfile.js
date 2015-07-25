module.exports = function (grunt){
	grunt.initConfig({
		concat:{
			fantastic: {
					src: ['public/modules/**/*.js'],
					dest: 'public/dist/fantastic.js'
			},
			vendor: {
				src: ["public/libs/angular-route/angular-route.min.js",
							"public/libs/angular-bootstrap/ui-bootstrap.min.js",
							"public/libs/angular-sanitize/angular-sanitize.min.js",
							"public/libs/angulartics/dist/angulartics.min.js",
							"public/libs/angulartics/dist/angulartics-segmentio.min.js",
							"node_modules/moment/moment.js",
							"node_modules/angular-moment/angular-moment.js"
							],
				dest: 'public/dist/vendor.js'
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
		cssmin: {
			target: {
				src: ['public/css/user/*.css', 'public/css/*.css'],
      			dest: 'public/dist/main.min.css'
     		},
     		mobile: {
     			src:['public/css/mobile/mobile.css'],
     			dest: 'public/dist/mobile.min.css'
     		}
     	},
		less: {
			development: {
				options: {
					paths: ['public/css/mobile']
				},
				files:{
					'public/css/mobile/mobile.css': 'public/css/styles.less'
				}
			}
		},
		watch: {
			less: {
				files: ['public/css/mobile/*.less'],
				tasks: ['less']
			},
			js: {
				files: ['public/modules/**/*.js'],
				tasks: ['concat', 'uglify']
			},
			css: {
				files: ['public/css/*.css', 'public/css/user/*.css'],
				tasks: ['cssmin:target']
			},
			mobile:{
				files: ['public/css/mobile/mobile.css'],
				tasks: ['cssmin:mobile']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ["concat", "watch", "uglify", "cssmin"]);
};