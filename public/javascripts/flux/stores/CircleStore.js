define([
	'fluxxor',
	'flux/constants'
], function(Fluxxor, constants) {

	var CircleStore = Fluxxor.createStore({
		initialize: function() {
			this.circle = {name: '', description: '', users: []};

			this.bindActions(
				constants.CIRCLE.UPDATE, this.onUpdate,
				constants.CIRCLE.REGISTER_MEMBER, this.onRegisterMember,
				constants.CIRCLE.UNREGISTER_MEMBER, this.onUnregisterMember
			);
		},

		onUpdate: function(payload) {
			if (this.circle.name === payload.name && this.circle.description === payload.description) return;
			this.circle.name = payload.name;
			this.circle.description = payload.description;
			this.emit('change');
		},

		onRegisterMember: function(payload) {
			this.circle.users.push(payload.user);
			this.emit('change');
		},

		onUnregisterMember: function(payload) {
			for (var i = 0; i < this.circle.users.length; i++) {
				if (this.circle.users[i].id === payload.user.id) {
					this.circle.users.splice(i, 1);
					this.emit('change');
					return;
				}
			}
		},

		getState: function() {
			return {circle: this.circle};
		}
	});

	return CircleStore;

});
