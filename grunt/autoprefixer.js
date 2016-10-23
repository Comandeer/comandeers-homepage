module.exports = {
	main: {
		files: {
			[ `dist/css/main.${ global.config.timestamp }.css` ]: `dist/css/main.${ global.config.timestamp }.css`,
			[ `dist/css/kontakt.${ global.config.timestamp }.css` ]: `dist/css/kontakt.${ global.config.timestamp }.css`,
			[ `dist/css/projekty.${ global.config.timestamp }.css` ]: `dist/css/projekty.${ global.config.timestamp }.css`,
			[ `dist/css/o-mnie.${ global.config.timestamp }.css` ]: `dist/css/o-mnie.${ global.config.timestamp }.css`
		}
	}
};
