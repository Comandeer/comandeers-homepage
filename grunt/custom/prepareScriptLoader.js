module.exports = function( grunt ) {
	grunt.registerTask( 'prepareScriptLoader', function() {
		var fs = require( 'fs' ),
			timestamp = global.config.timestamp,
			path = `dist/js/loader.${ timestamp }.js`,
			file = fs.readFileSync( path, 'utf8' );

		file = file.replace( /{TIMESTAMP}/g, timestamp );

		fs.writeFileSync( path, file, 'utf8' );
	} );
};
