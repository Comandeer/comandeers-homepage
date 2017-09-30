module.exports = {
	dist: {
		options: {
			removeComments: true,
			collapseWhitespace: true,
			processConditionalComments: true
		},

		files: {
			'dist/index.html': 'dist/index.html',
			'dist/kontakt.html': 'dist/kontakt.html',
			'dist/cookies.html': 'dist/cookies.html',
			'dist/404.html': 'dist/404.html'
		}
	}
};
