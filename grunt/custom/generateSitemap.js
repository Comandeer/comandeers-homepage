module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'generateSitemap', () => {
		const fs = require( 'fs' );
		const config = global.config;

		function generateURIEntry( URI ) {
			const content = [];
			content.push( `<url>\n<loc>${ URI }</loc>\n` );

			if ( sitemap.changeFreq ) {
				content.push( `<changefreq>${ sitemap.changeFreq }</changefreq>\n` )
			}

			if ( sitemap.lastMod ) {
				content.push( `<lastmod>${ now }</lastmod>\n` );
			}

			content.push( '</url>\n' );

			return content.join( '' );
		}

		if ( !config.sitemap ) {
			return;
		}

		const uri = config.uri;
		const subpages = config.subpages;
		const sitemap = config.sitemap;
		const now = new Date().toISOString();
		const content = [
			'<?xml version="1.0" encoding="UTF-8" ?>\n<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
		];

		content.push( generateURIEntry( uri ) );

		Object.keys(subpages).forEach( ( subpage ) => {
			content.push( generateURIEntry( `${ uri }${ subpage }.html` ) );
		} );

		content.push( '</urlset>' );

		fs.writeFileSync( `dist/${ sitemap.fileName }.xml`, content.join( '\n' ), 'utf8' );
	} );
}
