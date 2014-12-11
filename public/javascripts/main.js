require.config({
	baseUrl: '/javascripts',

	paths: {
		jquery: '//code.jquery.com/jquery-1.10.0.min',
		socketio: '//cdn.socket.io/socket.io-1.2.0',
		fluxxor: 'libs/fluxxor',
		react: '//fb.me/react-0.12.1',
		JSXTransformer: 'libs/JSXTransformer',
		jsx: 'libs/jsx',
		text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text'
	},

	shim: {
		react: {exports: 'React'},
		JSXTransformer: 'JSXTransformer'
	},

	jsx: {
		fileExtension: '.jsx',
		transformOptions: {
			harmony: true,
			stripTypes: false
		},
		usePragma: false
	}
});

require([
	'./flux'
], function() {
});
