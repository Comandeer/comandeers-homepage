module.exports = {
	timestamp: Date.now(),
	title: 'Comandeer\'s Homepage',
	description: 'Comandeerowa domowa, czyli Comandeera miejsce w Sieci – ciasne, ale (chyba) własne.',
	titleSeparator: ' @ ',
	layout: 'main',
	frontPage: 'index',
	generateMenu: true,
	includeFrontInMenu: false,
	uri: ( process.env.DOMOWA_DEV ? 'http://comandeer.dev/' : 'https://www.comandeer.pl/' ),
	subpages: {
		'o-mnie': {
			title: 'O mnie',
			description: 'Krótko i treściwie o uroczej osobie Comandeera. Czemu nie chcesz go poznać.',
			menu: 'O mnie'
		},

		'projekty': {
			title: 'Projekty',
			description: 'Projekty będące owocami płodnego umysłu Comandeera, czyli Frankensteiny Internetu.',
			menu: 'Projekty'
		},
		'kontakt': {
			title: 'Kontakt',
			description: 'Kontakt – jak dorwać Comandeera.',
			menu: 'Kontakt'
		},

		'cookies': {
			title: 'Cookies',
			description: 'Smaczne kąski i ich znaczenie dla strony.',
			menu: false
		},
		404: {
			title: 'Nie ma takiej strony',
			description: 'Nie ma takiej strony',
			menu: false
		}
	},
	sitemap: {
		fileName: 'sitemap',
		lastMod: true,
		changeFreq: false
	},
	robots: [
		'/tutorials/'
	],
	humans: [
		{
			title: 'Author & Owner',
			name: 'Comandeer',
			site: 'https://www.comandeer.pl'
		}
	],
	optimizeImages: [
		'images'
	],
	serverPushes: {
		always: [
			'/images/custom/logo2.png',
			'/js/menu.js',
			'/js/zoom.js'
		]
	},
	CSP: {
		header: `${ process.env.DOMOWA_DEV ? '' : 'upgrade-insecure-requests;' }default-src 'none'; object-src 'none'; img-src 'self' *.google-analytics.com data:; child-src 'self' *.youtube-nocookie.com; frame-ancestors 'self';`,
		script: "https://www.google-analytics.com/analytics.js 'strict-dynamic' 'unsafe-inline'",
		style: ""
	}
};
