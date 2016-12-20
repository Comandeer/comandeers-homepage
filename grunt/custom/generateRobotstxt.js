module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'generateRobotstxt', () => {
		const config = global.config;
		const fs = require( 'fs' );
		const content = [
			'user-agent: *'
		];
		const robots = config.robots;
		const sitemap = config.sitemap;
		const uri = config.uri;

		if ( robots.length < 1 ) {
			content.push( 'disallow:' );
		} else {
			robots.forEach( ( robot ) => {
				content.push( `disallow: ${ robot }` );
			} );
		}

		if ( sitemap ) {
			content.push( `sitemap: ${ uri }${ sitemap.fileName }.xml` );
		}

		fs.writeFileSync( 'dist/robots.txt', content.join( '\n' ), 'utf8' );
	} );
}
