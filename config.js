module.exports = {
	timestamp: Date.now(),
	title: 'Comandeer\'s Homepage',
	description: 'Comandeerowa domowa, czyli Comandeera miejsce w Sieci – ciasne, ale (chyba) własne.',
	titleSeparator: ' @ ',
	layout: 'main',
	frontPage: 'index',
	generateMenu: true,
	includeFrontInMenu: `Comandeer's Homepage`,
	uri: ( process.env.DOMOWA_DEV ? 'http://comandeer.test/' : 'https://www.comandeer.pl/' ),
	menu: {
		mainClass: 'nav__menu menu',
		itemClass: 'menu__item',
		linkClass: 'menu__link',
		activeClass: 'menu__link_active',
		hintClass: 'sr-only',
		links: {
			'O mnie': '/#o-mnie',
			'Kontakt': '/#kontakt'
		}
	},
	subpages: {
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
		always: {
			'/images/custom/logo2.png': 'image'
		}
	},
	CSP: {
		header: `${ process.env.DOMOWA_DEV ? '' : 'upgrade-insecure-requests;' }default-src 'self'; connect-src 'self'; object-src 'none'; img-src 'self' *.google-analytics.com data:; child-src 'self' *.youtube-nocookie.com; frame-ancestors 'self';`,
		script: "https://www.google-analytics.com/analytics.js 'strict-dynamic' 'unsafe-inline'",
		style: ""
	}
};
