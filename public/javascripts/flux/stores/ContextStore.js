define([
	'fluxxor',
	'flux/constants'
], function(Fluxxor, constants) {

	var ContextStore = Fluxxor.createStore({
		initialize: function() {
			this.sidebar = false;
			this.sidebarAnimate = false,
			this.screen = 'home';
			this.title = '퀘스트';

			this.bindActions(
				constants.CONTEXT.SHOW_SIDEBAR, this.onShowSidebar,
				constants.CONTEXT.HIDE_SIDEBAR, this.onHideSidebar,
				constants.CONTEXT.CHANGE_SCREEN, this.onChangeScreen
			);
		},

		onShowSidebar: function(payload) {
			if (this.sidebar === true) return;
			this.sidebar = true;
			this.sidebarAnimate = true;
			this.emit('change');
		},

		onHideSidebar: function(payload) {
			if (this.sidebar === false) return;
			this.sidebar = false;
			this.sidebarAnimate = true;
			this.emit('change');
		},

		onChangeScreen: function(payload) {

		},

		getState: function() {
			return {
				sidebar: this.sidebar,
				sidebarAnimate: this.sidebarAnimate,
				screen: this.screen,
				title: this.title
			};
		}
	});

	return ContextStore;

});
