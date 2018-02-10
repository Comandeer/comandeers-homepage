( function() {
	// Menu.
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
} () );
