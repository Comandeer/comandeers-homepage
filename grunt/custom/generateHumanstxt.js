module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'generateHumanstxt', () => {
		const config = global.config;
		const fs = require( 'fs' );
		const content = [
			'/* TEAM */'
		];

		config.humans.forEach( ( human ) => {
			content.push( `${ human.title }: ${ human.name }\nSite: ${ human.site }` );
		} );

		fs.writeFileSync( 'dist/humans.txt', content.join( '\n' ), 'utf8' );
	} );
};
