require.config({
	baseUrl: '/javascripts',

	paths: {
		jquery: '//code.jquery.com/jquery-1.10.0.min',
		react: '//fb.me/react-0.12.1',
		JSXTransformer: './JSXTransformer',
		jsx: './jsx',
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
	'react',
	'jsx!components/comment'
], function(React, JSXTransformer, CommentBox) {
	// var CommentBox = comment.CommentBox;
	// console.log(CommentBox);
	// React.render(<CommentBox url='/comments.json' pollInterval={2000} />, $('#content').get(0));
});
