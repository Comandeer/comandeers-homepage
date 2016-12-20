module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'prepareScriptLoader', () => {
		const fs = require( 'fs' );
		const timestamp = global.config.timestamp;
		const path = `dist/js/loader.${ timestamp }.js`;
		let file = fs.readFileSync( path, 'utf8' );

		file = file.replace( /{TIMESTAMP}/g, timestamp );

		fs.writeFileSync( path, file, 'utf8' );
	} );
};
