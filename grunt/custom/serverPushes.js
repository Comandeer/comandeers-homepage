module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'serverPushes', () => {
		const fs = require( 'fs' )
		const file = fs.readFileSync( fs.existsSync( 'dist/.htaccess' ) ? 'dist/.htaccess' : 'apache/.htaccess', 'utf8' );
		const config = global.config;
		const timestamp = config.timestamp;
		const pushes = config.serverPushes || {};
		const pages = Object.keys( config.subpages );
		const header = 'H2PushResource add "{RES}"';
		const template = `<Files "{FILE}">
			{RULES}
		</Files>\n`;
		const templateAlways = `<FilesMatch "\\.html$">
			{RULES}
		</FilesMatch>\n`;
		const alwaysRules = []
		let output = '';

		function prepareHeader( res, type = 'style' ) {
			res = addTimeStamp( res );

			return header.replace( /{RES}/g, res ).replace( /{TYPE}/g, type );
		}

		function addTimeStamp( res ) {
			var res = res.split( '.' );

			if ( [ 'css', 'js' ].indexOf( res[ res.length - 1 ] ) !== -1 && res[ res.length - 2 ] !== String( timestamp ) ) {
				res.splice( res.length - 1, 0, timestamp );
			}

			return res.join( '.' );
		}

		if ( pushes.always ) {
			Object.keys( pushes.always ).forEach( ( push ) => {
				alwaysRules.push( prepareHeader( push, pushes.always[ push ] ) );
			} );

			output += templateAlways.replace( /{RULES}/g, alwaysRules.join( '\n' ) );
		}

		pages.push( 'index' );

		pages.forEach( ( page ) => {
			const pageTemplate = template.replace( /{FILE}/g, `${ page }.html` );
			const rules = [];

			//CSS
			if ( fs.existsSync( `dist/css/${ page }.${ timestamp }.css` ) ) {
				rules.push( prepareHeader( `/css/${ page }.${ timestamp }.css` ) );
			} else {
				rules.push( prepareHeader( `/css/main.${ timestamp }.css` ) );
			}

			if ( pushes[ page ] ) {
				pushes[ page ].forEach( ( push ) => {
					rules.push( prepareHeader( push ) );
				} );
			}

			output += pageTemplate.replace( /{RULES}/g, rules.join( '\n' ) );
		} );

		fs.writeFileSync( 'dist/.htaccess', file.replace( /{PUSHES}/g, output ), 'utf8' );
	} );
};
