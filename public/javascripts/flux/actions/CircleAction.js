define([
	'flux/constants'
], function(constants) {

	return {
		update: function(name, description) {
			this.dispatch(constants.CIRCLE.UPDATE, {name: name, description: description});
		},

		registerMember: function(user) {
			this.dispatch(constants.CIRCLE.REGISTER_MEMBER, {user: user});
		},

		unregisterMember: function(user) {
			this.dispatch(constants.CIRCLE.UNREGISTER_MEMBER, {user: user});
		}
	};

});