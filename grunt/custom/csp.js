module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'csp', () => {
		const config = global.config.CSP;
		const url = global.config.uri;
		const fs = require( 'fs' );
		const glob = require( 'glob' );
		const payload = require( `${ process.cwd() }/payload.json` );
		const hashes = {};
		let header = config.header || '';
		let file = fs.readFileSync( 'apache/.htaccess', 'utf8' );

		function prepareHashes( payload ) {
			const types = {
				script: '.js',
				style: '.css'
			};

			for ( const res in payload ) {
				for ( const type in types ) {
					if ( payload[ res ].path.endsWith( types[ type ] ) ) {
						if ( !hashes[ type ] ) {
							hashes[ type ] = [];
						}

						for ( const hash in payload[ res ].hashes ) {
							hashes[ type ].push( `'${ hash }-${ payload[ res ].hashes[ hash ] }'` );
						}

						hashes[ type ].push( `${ url }${ payload[ res ].path.replace( 'dist/', '' ) }` );
					}
				}
			}
		}

		function generateHeader( type, hashes ) {
			const parts = [ `${ type }-src ${ config[ type ] }` ];

			hashes && hashes.forEach( function( hash ) {
				parts.push( hash );
			} );

			return `${ parts.join( ' ' ) };`;
		}

		prepareHashes( payload );

		Object.keys( config ).forEach( ( type ) => {
			if ( type === 'header' ) {
				return;
			}

			header += generateHeader( type, hashes[ type ] );
		} );

		file = file.replace( /{CSP}/g, header );
		fs.writeFileSync( 'dist/.htaccess', file, 'utf8' );
	} );
};
