define([
	'jquery',
	'react'
], function($, React) {

	var CommentBox = React.createClass({
		loadComments: function() {
			$.get(this.props.url, function(data) {
				this.setState({data: data})
			}.bind(this));
		},

		handleCommentSubmit: function(comment) {
			var comments = this.state.data;
			var newComments = comments.concat([comment]);
			this.setState(newComments);
			$.post(this.props.url, comment, function(data) {
				this.setState({data: data});
			}.bind(this));
		},

		getInitialState: function() {
			return {data: []};
		},

		componentDidMount: function() {
			this.loadComments();
			setInterval(this.loadComments, this.props.pollInterval);
		},

		render: function() {
			return (
				<div className='commentBox'>
					<h1>Comments</h1>
					<CommentList data={this.state.data} />
					<CommentForm onCommentSubmit={this.handleCommentSubmit} />
				</div>
			);
		}
	});

	var Comment = React.createClass({
		render: function() {
			var rawMarkup = this.props.children;
			return (
				<div className='comment'>
					<h2 className='commentAuthor'>{this.props.author}</h2>
					{rawMarkup}
				</div>
			);
		}
	});

	var CommentList = React.createClass({
		render: function() {
			var commentNodes = this.props.data.map(function(comment) {
				return (<Comment author={comment.author}>{comment.text}</Comment>);
			});
			return (
				<div className='commentList'>{commentNodes}</div>
			);
		}
	});

	var CommentForm = React.createClass({
		handleSubmit: function(e) {
			e.preventDefault();
			var author = this.refs.author.getDOMNode().value.trim();
			var text = this.refs.text.getDOMNode().value.trim();
			if (!author || !text) return;
			this.props.onCommentSubmit({author: author, text: text});
			this.refs.author.getDOMNode().value = '';
			this.refs.text.getDOMNode().value = '';
			return;
		},

		render: function() {
			return (
				<form className='commentForm' onSubmit={this.handleSubmit}>
					<input type='text' placeholder='your name' ref='author' />
					<input type='text' placeholder='say something' ref='text' />
					<input type='submit' value='post' />
				</form>
			);
		}
	});

	React.render(<CommentBox url='/comments.json' pollInterval={2000} />, $('#content').get(0));

});