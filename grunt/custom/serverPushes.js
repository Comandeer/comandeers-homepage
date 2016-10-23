module.exports = function( grunt ) {
	grunt.registerTask( 'serverPushes', function() {
		var fs = require( 'fs' ),
			file = fs.existsSync( 'dist/.htaccess' ) ? fs.readFileSync( 'dist/.htaccess', 'utf8' ): fs.readFileSync( 'apache/.htaccess', 'utf8' ),
			config = global.config,
			timestamp = config.timestamp,
			pushes = config.serverPushes || {},
			pages = Object.keys( config.subpages ),
			header = 'Header add Link "<{RES}>;rel=preload"',
			template = `<Files "{FILE}">
				{RULES}
			</Files>\n`,
			templateAlways = `<FilesMatch "\\.html$">
				{RULES}
			</FilesMatch>\n`,
			alwaysRules = [],
			output = '';

		function prepareHeader( res ) {
			res = addTimeStamp( res );

			return header.replace( /{RES}/g, res );
		}

		function addTimeStamp( res ) {
			var res = res.split( '.' );

			if ( [ 'css', 'js' ].indexOf( res[ res.length - 1 ] ) !== -1 && res[ res.length - 2 ] !== String( timestamp )) {
				res.splice( res.length - 1, 0, timestamp );
			}

			return res.join( '.' );
		}

		if ( pushes.always ) {
			pushes.always.forEach( function( push ) {
				alwaysRules.push( prepareHeader( push ) );
			} );

			output += templateAlways.replace( /{RULES}/g, alwaysRules.join( '\n' ) );
		}

		pages.push( 'index' );

		pages.forEach( function( page ) {
			var pageTemplate = template.replace( /{FILE}/g, `${ page }.html` ),
				rules = [];

			//CSS
			if ( fs.existsSync( `dist/css/${ page }.${ timestamp }.css` ) ) {
				rules.push( prepareHeader( `/css/${ page }.${ timestamp }.css` ) );
			} else {
				rules.push( prepareHeader( `/css/main.${ timestamp }.css` ) );
			}

			if ( pushes[ page ] ) {
				pushes[ page ].forEach( function( push ) {
					rules.push( prepareHeader( push ) );
				} );
			}

			output += pageTemplate.replace( /{RULES}/g, rules.join( '\n' ) );
		} );

		fs.writeFileSync( 'dist/.htaccess', file.replace( /{PUSHES}/g, output ), 'utf8' );
	} );
};
