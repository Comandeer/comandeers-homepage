interface IContact {
	label: string;
	type: 'email' | 'url';
	url: string;
}

interface IConfig {
	readonly url: string;
	readonly title: string;
	readonly description: string;
	readonly author: string;
	readonly lightPrimary: string;
	readonly darkPrimary: string;
	readonly contact: ReadonlyArray<IContact>;
}

export const config: IConfig = {
	url: 'https://www.comandeer.pl',
	title: 'Comandeer\'s Homepage',
	description: 'Comandeer\'s Homepage. Just some links to his other sites and profiles.',
	author: 'Comandeer',
	lightPrimary: '#fdfdfd',
	darkPrimary: '#111',
	contact: [
		{
			label: 'E-mail',
			type: 'email',
			url: 'mailto:comandeer@comandeer.pl'
		},

		{
			label: 'Blog',
			type: 'url',
			url: 'https://blog.comandeer.pl'
		},

		{
			label: 'GitHub',
			type: 'url',
			url: 'https://github.com/Comandeer'
		},

		{
			label: 'WebKrytyk',
			type: 'url',
			url: 'https://www.webkrytyk.pl'
		}
	]
};
