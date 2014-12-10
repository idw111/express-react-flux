define([
	'react'
], function(React) {

	var HelloWorld = React.createClass({
		render: function() {
			return (
				<p>
					Hello, <input type='text' placeholder='yourname' />
					It is {this.props.date.toTimeString()}
				</p>
			);
		}
	});

	setInterval(function() {
		React.render(
			<HelloWorld date={new Date()} />,
			document.getElementById('content')
		);
	}, 500);

});
