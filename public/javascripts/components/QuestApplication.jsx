define([
	'fluxxor',
	'react',
	'jsx!components/Sidebar',
	'jsx!components/Header'
], function(Fluxxor, React, Sidebar, Header) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	/**
	 * - QuestApplication
	 *   - Sidebar
	 *     - SidebarHeader
	 *     - SidebarMenu
	 *       - SidebarMenuCaption
	 *       - SidebarMenuItem (*)
	 *   - Header
	 *     - HeaderTitle
	 *     - HeaderMenu
	 *       - HeaderMenuItem (*)
	 *   - Screen
	 *     - MessageScreen -- MessageStore
	 *     - MissionScreen -- MissionStore
	 *     - SignupScreen  -- ProfileStore
	 *     - LoginScreen   -- ProfileStore
	 */

	var QuestApplication = React.createClass({
		mixins: [FluxMixin],

		render: function() {
			var flux = this.getFlux();
			return (
				<div className='application'>
					<Sidebar flux={flux} />
					<Header flux={flux} />
				</div>
			);
		}
	});

	return {
		render: function(flux, el) {
			React.render(<QuestApplication flux={flux} />, el);
		}
	};

});