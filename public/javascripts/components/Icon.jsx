define([
	'react'
], function(React) {

	var Icon = React.createClass({
		render: function() {
			switch (this.props.type) {
				case 'dripicons':
					return (
						<Dripicon {...this.props} />
					);
				default:
					return null;
			}
		}
	});

	var Dripicon = React.createClass({
		render: function() {
			console.log(this.props)
			return (
				<div className='dripicons' style={this.props.style} onClick={this.props.onClick} dangerouslySetInnerHTML={{__html: this.props.children}} />
			)
		}
	});

	return Icon;

});