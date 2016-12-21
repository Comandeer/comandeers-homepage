( function() {
	if( !( 'function' != typeof document.getElementsByClassName || 'undefined' == typeof window.addEventListener ||
		!( 'classList' in document.createElement( 'div' ) ) || 980 > window.innerWidth ) ) {
		var overlay = document.createElement( 'div' ),
			notification = document.createElement( 'span' ),
			img = document.createElement( 'img' ),
			previouslyFocused;

		function open( src, alt, element ) {
			img.src = src;
			img.alt = alt;

			overlay.setAttribute( 'aria-hidden', false );
			overlay.classList.add( 'zoomer_visible' );

			notification.innerHTML = 'Otworzono powiększenie screenshota. Naciśnij <kbd>Esc</kbd>, aby zamknąć.';

			previouslyFocused = element;

			document.addEventListener( 'click', close, false );
			document.addEventListener( 'keydown', escHandler, false );
		}

		function escHandler( evt ) {
			if ( evt.keyCode !== 27 ) {
				return true;
			}

			evt.preventDefault();
			close();
		}

		function close() {
			img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
			img.alt = '';

			overlay.setAttribute( 'aria-hidden', true );
			overlay.classList.remove( 'zoomer_visible' );

			notification.innerHTML = '';

			previouslyFocused.focus();
			previouslyFocused = null;

			document.removeEventListener( 'click', close, false );
			document.removeEventListener( 'keydown', escHandler, false );
		};

		img.classList.add( 'zoomer__image' );
		img.alt = '';

		notification.classList.add( 'sr-only' );
		notification.setAttribute( 'aria-live', 'assertive' );

		overlay.classList.add( 'zoomer' );
		overlay.appendChild( img );
		overlay.appendChild( notification );
		document.body.appendChild( overlay );

		for ( var zoomLinks = document.getElementsByClassName( 'screenshot__zoom' ), i = 0; i < zoomLinks.length; ++i ) {
			zoomLinks[ i ].addEventListener( 'click', function( evt ) {
				if ( !this.href ) {
					return true;
				}

				evt.preventDefault();
				evt.stopPropagation();

				open( this.href, this.parentNode.parentNode.getElementsByClassName( 'project__name' )[ 0 ].textContent + ' – screenshoot', this );
			}, false );
		}
	}
} () );
