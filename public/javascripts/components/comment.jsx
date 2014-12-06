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
			console.log(comment)
			this.props.socket.emit('comment', JSON.stringify({channel: this.props.channel, data: comment}));
		},

		bind: function(socket) {
			socket.on('comments', function(data) {
				console.log('comments', data);
				this.setState({data: data});
			}.bind(this));

			socket.on('comment', function(data) {
				var comments = this.state.data;
				this.setState({data: comments.concat([data])});
			}.bind(this));

			socket.emit('comments', JSON.stringify({channel: this.props.channel}));
		},

		getInitialState: function() {
			return {data: []};
		},

		componentDidMount: function() {
			this.bind(this.props.socket);
			// this.loadComments();
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
				return (<Comment author={comment.author}>{comment.message}</Comment>);
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
			var message = this.refs.message.getDOMNode().value.trim();
			if (!author || !message) return;
			this.props.onCommentSubmit({author: author, message: message});
			this.refs.author.getDOMNode().value = '';
			this.refs.message.getDOMNode().value = '';
			return;
		},

		render: function() {
			return (
				<form className='commentForm' onSubmit={this.handleSubmit}>
					<input type='text' placeholder='your name' ref='author' />
					<input type='text' placeholder='say something' ref='message' />
					<input type='submit' value='post' />
				</form>
			);
		}
	});

	var render = function(socket, channel) {
		React.render(<CommentBox url='/comments.json' socket={socket} channel={channel} />, $('#content').get(0));
	};

	return {
		render: render
	};

});