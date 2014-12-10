define([
	'fluxxor',
	'jsx!components/Todo'
], function(Fluxxor, Todo) {

	// Sidebar.render(document.getElementById('content'));
	
	var constants = {
		ADD_TODO: 'ADD_TODO',
		TOGGLE_TODO: 'TOGGLE_TODO',
		CLEAR_TODOS: 'CLEAR_TODOS'
	};

	var TodoStore = Fluxxor.createStore({
		initialize: function() {
			this.todos = [];

			this.bindActions(
				constants.ADD_TODO, this.onAddTodo,
				constants.TOGGLE_TODO, this.onToggleTodo,
				constants.CLEAR_TODOS, this.onClearTodos
			);
		},

		onAddTodo: function(payload) {
			this.todos.push({text: payload.text, complete: false});
			this.emit('change');
		},

		onToggleTodo: function(payload) {
			this.todos = !payload.todo.complete;
			this.emit('change');
		},

		onClearTodos: function(payload) {
			this.todos = this.todos.filter(function(todo) {
				return !todo.complete;
			});
			this.emit('change');
		},

		getState: function() {
			return {todos: this.todos};
		}
	});

	var actions = {
		addTodo: function(text) {
			this.dispatch(constants.ADD_TODO, {text: text});
		},

		toggleTodo: function(todo) {
			this.dispatch(constants.TOGGLE_TODO, {todo: todo});
		},

		clearTodos: function() {
			this.dispatch(constants.CLEAR_TODOS);
		}
	};

	var stores = {
		TodoStore: new TodoStore()
	};

	var flux = new Fluxxor.Flux(stores, actions);

	flux.on('dispatch', function(type, payload) {
		console.log('[Dispatch]', type, payload);
	});

	Todo.render(flux, document.getElementById('content'));

});