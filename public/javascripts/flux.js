require([
	'fluxxor',
	'flux/stores',
	'flux/actions',
	'jsx!components/QuestApplication'
], function(Fluxxor, stores, actions, app) {

	var flux = new Fluxxor.Flux(stores, actions);

	flux.on('dispatch', function(type, payload) {
		console.log('[Dispatch]', type, payload);
	});

	app.render(flux, document.body);

});