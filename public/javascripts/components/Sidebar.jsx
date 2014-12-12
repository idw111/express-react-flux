define([
	'fluxxor',
	'react'
], function(Fluxxor, React) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	/**
	 * - Sidebar
	 *   - SidebarHeader
	 *   - SidebarMenu
	 *     - SidebarCaption
	 *     - SidebarMenuItem
	 *   - SidebarSeperator
	 */

	var Sidebar = React.createClass({
		mixins: [FluxMixin, StoreWatchMixin('ContextStore')],

		getStateFromFlux: function() {
			return {
				context: this.getFlux().store('ContextStore').getState()
			}
		},

		render: function() {
			var className = !this.state.context.sidebarAnimate ? 'sidebar' : 'sidebar ' + (this.state.context.sidebar ? 'visible' : 'hidden');
			return (
				<div className={className}>
					<SidebarHeader>{this.state.circle ? this.state.circle.name : 'Home'}</SidebarHeader>
					<SidebarMenu caption='circle menu' items={this.getCircleMenu()} />
				</div>
			);
		},

		getCircleMenu: function() {
			return [];
			return [
				{href: '#', name: 'test1'},
				{href: '#', name: 'test2'}
			];
		},

		getInitialState: function() {
			return {user: null, circle: null};
		}
	});

	var SidebarHeader = React.createClass({
		render: function() {
			return (
				<h2 className='header'>
					<a href='#'>
						<span className='batch'>&#xf0c7;</span>
						<span className='text'>{this.props.children}</span>
					</a>
				</h2>
			);
		}
	});

	var SidebarMenu = React.createClass({
		render: function() {
			var menuItems = this.props.items.map(function(item) {
				return (<SidebarMenuItem href='{item.href}'>{item.name}</SidebarMenuItem>);
			});
			return (
				<ul className='sidebar-menu'>
					<SidebarMenuCaption>{this.props.caption}</SidebarMenuCaption>
					{menuItems}
				</ul>
			);
		}
	});

	var SidebarMenuCaption = React.createClass({
		render: function() {
			return (
				<li className='sidebar-menu-caption'>{this.props.children}</li>
			);
		}
	});

	var SidebarMenuItem = React.createClass({
		render: function() {
			return (
				<li className='sidebar-menu-item'>
					<a href='{this.props.href}'>{this.props.children}</a>
				</li>
			);
		}
	});

	var SidebarSeperator = React.createClass({
		render: function() {
			return (
				<div className='sidebar-seperator' />
			);
		}
	});

	return Sidebar;

});