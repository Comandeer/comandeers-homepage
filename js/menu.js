( function( toggler ) {
	var id = toggler.getAttribute( 'href' ).substr( 1 ),
		menu = document.getElementById( id );

	function checkMenuVisibility( menu ) {
		return menu.classList.contains( 'nav_open' ) || location.hash === '#' + menu.id;
	}

	function closeMenu( menu, toggler ) {
		menu.classList.remove( 'nav_open' );

		toggler.setAttribute( 'aria-expanded', 'false' );
	}

	function toggleMenu( menu, toggler ) {
		var isVisible;

		menu.classList.toggle( 'nav_open' );
		isVisible = checkMenuVisibility( menu );

		toggler.setAttribute( 'aria-expanded', String( isVisible ) );
	}

	toggler.setAttribute( 'role', 'button' );
	toggler.setAttribute( 'aria-controls', id );
	toggler.setAttribute( 'aria-label', 'Rozwiń/zwiń menu' );
	menu.setAttribute( 'aria-expanded', String( checkMenuVisibility( menu ) ) );

	toggler.addEventListener( 'keyup', function( evt ) {
		if ( evt.keyCode === 32 || evt.keyCode === 13 ) {
			evt.preventDefault();
			toggleMenu( menu, toggler );
		}
	}, false );
	document.addEventListener( 'click', function( evt ) {
		if ( evt.target === toggler ) {
			evt.preventDefault();
			return toggleMenu( menu, toggler );
		}

		if ( menu.contains( evt.target ) ) {
			return;
		}

		closeMenu( menu, toggler );
	}, false );
}( document.querySelector( '.header__nav-toggler' ) ) );
