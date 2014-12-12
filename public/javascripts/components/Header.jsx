define([
	'fluxxor',
	'react',
	'jsx!components/Icon'
], function(Fluxxor, React, Icon) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	/**
	 * - Header
	 *   - HeaderTitle
	 *   - HeaderMenu
	 */

	var Header = React.createClass({
		mixins: [FluxMixin, StoreWatchMixin('ContextStore')],

		getStateFromFlux: function() {
			return this.getFlux().store('ContextStore').getState();
		},

		render: function() {
			var className = !this.state.sidebarAnimate ? '' : this.state.sidebar ? 'sidebar-visible' : 'sidebar-hidden';
			return (
				<nav className={className}>
					<h1>{this.state.title}</h1>
					<HeaderMenu sidebar={this.state.sidebar} showSidebar={this.showSidebar} hideSidebar={this.hideSidebar} />
				</nav>
			);
		},

		showSidebar: function() {
			this.getFlux().actions.CONTEXT.showSidebar();
		},

		hideSidebar: function() {
			this.getFlux().actions.CONTEXT.hideSidebar();
		},

		addQuest: function() {
			// change screen
		}
	});

	var HeaderMenu = React.createClass({
		render: function() {
			var sidebarIcon = (function() {
				if (!this.props.sidebar)
					return (<Icon type='dripicons' onClick={this.props.showSidebar}>&#xe056;</Icon>);
				else
					return (<Icon type='dripicons' onClick={this.props.hideSidebar}>&#xe008;</Icon>);
			}).bind(this)();
			return (
				<div className='header-menu'>
					{sidebarIcon}
					<Icon type='dripicons' style={{float: 'right'}}>&#xe065;</Icon>
				</div>
			);
		}
	});

	return Header;

});