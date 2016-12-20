module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'configure', () => {
		const fs = require( 'fs' );
		const config = global.config;
		const dist = config.distCSS;
		const images = config.optimizeImages;
		const files = {};

		try {
			fs.mkdirSync( 'dist' );
			fs.mkdirSync( 'dist/css' );
			fs.mkdirSync( 'dist/js' );
		} catch( e ) {
			console.log( e );
		}

		if ( Array.isArray( images ) && images.length > 0 ) {
			images.forEach( ( image ) => {
				grunt.config.set( 'imagemin.main.files', grunt.config.get( 'imagemin.main.files' ).concat( {
					expand: true,
					cwd: `dist/${ image }`,
					src: [
						'**/*.png',
						'**/*.gif',
						'**/*.jpg'
					],
					dest: `dist/${ image }`
				} ) );
			} );
		}
	} );
};
