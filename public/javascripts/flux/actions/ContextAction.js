define([
	'flux/constants'
], function(constants) {

	return {
		showSidebar: function() {
			this.dispatch(constants.CONTEXT.SHOW_SIDEBAR, {});
		},

		hideSidebar: function() {
			this.dispatch(constants.CONTEXT.HIDE_SIDEBAR, {});
		}
	};

});