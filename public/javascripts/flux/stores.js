define([
	'flux/stores/ContextStore',
	'flux/stores/CircleStore'
], function(ContextStore, CircleStore) {

	return {
		ContextStore: new ContextStore(),
		CircleStore: new CircleStore()
	};
	
});
