var timestamp = Date.now();

module.exports = {
	timestamp,
	title: 'Comandeer\'s Homepage',
	description: 'Comandeer\'s Homepage. Just some links to his other sites and profiles.',
	titleSeparator: ' @ ',
	layout: 'main',
	frontPage: 'index',
	generateMenu: true,
	includeFrontInMenu: `Comandeer's Homepage`,
	uri: ( process.env.DOMOWA_DEV ? 'https://comandeer.test/' : 'https://www.comandeer.pl/' ),
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
		404: {
			title: 'Page not found',
			description: 'Page not found',
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
			'/images/custom/logo.svg': 'image'
		}
	},
	CSP: {
		header: `upgrade-insecure-requests;default-src 'self'; connect-src 'self'; object-src 'none'; img-src 'self'; child-src 'self' *.youtube-nocookie.com; frame-ancestors 'self';`,
		script: "",
		style: ""
	}
};
