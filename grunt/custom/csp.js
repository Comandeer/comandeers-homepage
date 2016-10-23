module.exports = function( grunt ) {
	grunt.registerTask( 'csp', function() {
		var config = global.config.CSP,
			url = global.config.uri,
			fs = require( 'fs' ),
			glob = require( 'glob' ),
			payload = require( `${ process.cwd() }/payload.json` ),
			file = fs.readFileSync( 'apache/.htaccess', 'utf8' ),
			header = config.header || '',
			hashes = {};

		function prepareHashes( payload ) {
			var types = {
					script: '.js',
					style: '.css'
				},
				type,
				hash,
				res;

			for ( res in payload ) {

				for ( type in types ) {
					if ( payload[ res ].path.endsWith( types[ type ] ) ) {
						if ( !hashes[ type ] ) {
							hashes[ type ] = [];
						}

						for ( hash in payload[ res ].hashes ) {
							hashes[ type ].push( `'${ hash }-${ payload[ res ].hashes[ hash ] }'` );
						}

						hashes[ type ].push( `${ url }${ payload[ res ].path.replace( 'dist/', '' ) }` );
					}
				}
			}
		}

		function generateHeader( type, hashes ) {
			var parts = [ `${ type }-src ${ config[ type ] }` ];

			hashes && hashes.forEach( function( hash ) {
				parts.push( hash );
			} );

			return `${ parts.join( ' ' ) };`;
		}

		prepareHashes( payload );

		Object.keys( config ).forEach( function( type ) {
			if ( type === 'header' ) {
				return;
			}

			header += generateHeader( type, hashes[ type ] );
		} );

		file = file.replace( /{CSP}/g, header );
		fs.writeFileSync('dist/.htaccess', file, 'utf8');
	});
};
