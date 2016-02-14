module.exports={
	title: 'Comandeer\'s Homepage'
	,description: 'Comandeerowa domowa, czyli Comandeera miejsce w Sieci - ciasne, ale (chyba) własne.'
	,titleSeparator: ' @ ' //string oddzielający podtytuł strony od tytułu witryny
	,layout: 'main' //główny szablon, do którego wstawiane będą podstrony
	,frontPage: 'index' //nazwa szablonu ze stroną początkową (bez rozszerzenia; rozszerzenie = html)
	,generateMenu: true //czy skrypt ma wygenerować menu (ordynarna lista linków stworzona na podstawie subpages)
	,includeFrontInMenu: false //czy uwzględnić stronę główną w menu (i treść linku - jeśli falsy value, to nie dodaje)
	,uri: 'https://www.comandeer.pl/' //URI strony (z trailing slash)
	,subpages: { //podstrony
		//klucz - nazwa szablonu (bez rozszerzenia)
		'o-mnie':
		{
			title: 'O mnie'
			,description: 'Krótko i treściwie o uroczej osobie Comandeera. Czemu nie chcesz go poznać.'
			,menu: 'O mnie'
		}
		,'projekty':
		{
			title: 'Projekty'
			,description: 'Projekty będące owocami płodnego umysłu Comandeera, czyli Frankensteiny Internetu.'
			,menu: 'Projekty'
		}
		,'kontakt':
		{
			title: 'Kontakt'
			,description: 'Kontakt - jak dorwać Comandeera.'
			,menu: 'Kontakt'
		}
		,'cookies':
		{
			title: 'Cookies'
			,description: 'Smaczne kąski i ich znaczenie dla strony.'
			,menu: false
		}
		,404:
		{
			title: 'Nie ma takiej strony'
			,description: 'Nie ma takiej strony'
			,menu: false
		}
	}
	,sitemap: { //sitemap - jeśli nie chcesz jej generowania, zamiast tego obiektu przypisz tu false (więcej info o opcjach: http://www.sitemaps.org/protocol.html)
		fileName: 'sitemap' //nazwa pliku z sitemap (bez rozszerzenia; rozszerzenie = xml)
		,lastMod: true //czy dodać czas ostatniej aktualizacji (ustawiony na now)
		,changeFreq: false //jak często strona się zmienia (jeśli nie chcesz tej opcji, wstaw false)
		/*TODO
		,images: [] //tablica z obrazkami do dołączenia do sitemap
		,videos: [] //tablica z filmikami do dołączenia do sitemap*/
	}
	,robots: [ //tu podaj nazwy plików, których nie powinny widzieć roboty
		'/tutorials/'
	]
	,humans: [ //lista ludzi, którzy zostaną dołączeni do zakładki team
		{
			title: 'Author & Owner' //stanowisko
			,name: 'Comandeer' //nick/imię i nazwisko
			,site: 'https://www.comandeer.pl' //strona autora
		}
	]
	,optimizeImages: [ //nazwy folderów, z których powinny być zoptymalizowane obrazki
		'images'
	]
	,serverPushes: { // nazwy zasobów, które mają być pushowane dla konkretnych podstron
		always: [
			'/images/custom/logo2.png'
			,'/js/ga.js'
		]
		,projekty: [
			'/js/zoom.js'
		]
		// TODO: push obrazków na "O mnie" i w "Projektach"
	}
	,CSP: "default-src 'self'; script-src 'self' *.google-analytics.com; img-src 'self' *.google-analytics.com data:; frame-src 'self' *.youtube-nocookie.com"
};
