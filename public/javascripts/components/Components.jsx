define([
	'react'
], function(React) {

	var ComponentSize = {
		LARGE: 'lg',
		DEFAULT: '',
		NORMAL: '',
		SMALL: 'sm',
		EXTRASMALL: 'xs'
	};

	// Button
	var Button = React.createClass({
		render: function() {
			var className = this.props.size ? 'btn btn-' + this.props.size : 'btn';
			return (
				<div className={className}>
					{this.props.children}
				</div>
			);
		}
	});

});
