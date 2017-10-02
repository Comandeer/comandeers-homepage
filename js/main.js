( function() {
	function loadJS( src ) {
		var script = document.createElement( 'script' );

		script.src = src;

		document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );
	}


	// GA init.
	window['GoogleAnalyticsObject'] = 'ga';
	window[ 'ga' ] = function() {
		window['ga'].q.push( arguments )
	};
	window[ 'ga' ].q = [];
	window[ 'ga' ].l = 1 * new Date();

	ga( 'create', 'UA-33158520-1', 'auto' );
	ga( 'send', 'pageview' );


	// And now load all scripts.
	loadJS( 'https://www.google-analytics.com/analytics.js' );

	// Menu.
	document.addEventListener( 'DOMContentLoaded', function() {
		function changeActiveLink() {
			var hash = location.hash;

			if ( hash !== '#' ) {
				[].forEach.call( document.querySelectorAll( '.menu__link' ), function( link ) {
					try {
						link.classList.toggle( 'menu__link_active', link.getAttribute( 'href' ).substr( 1 ) === hash );
					} catch( e ) {}
				} );
			}
		}

		window.addEventListener( 'hashchange', changeActiveLink );
		changeActiveLink();
	} );
} () );
