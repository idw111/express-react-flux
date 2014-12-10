define([
	'fluxxor',
	'react'
], function(Fluxxor, React) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var Application = React.createClass({
		mixins: [FluxMixin, StoreWatchMixin('TodoStore')],

		getInitialState: function() {
			return {newTodoText: ''};
		},

		getStateFromFlux: function() {
			var flux = this.getFlux();
			return flux.store('TodoStore').getState();
		},

		render: function() {
			var todos = this.state.todos.map(function(todo, index) {
				return (
					<li key={index}>
						<TodoItem todo={todo} />
					</li>
				);
			});
			return (
				<div>
					<ul>
						{todos}
					</ul>
					<form onSubmit={this.onSubmitTodo}>
						<input type='text' value={this.state.newTodoText} onChange={this.handleTodoTextChange} />
						<input type='submit' value='Add Todo' />
					</form>
				</div>
			);
		},

		onSubmitTodo: function(e) {
			e.preventDefault();
			if (this.state.newTodoText.trim()) {
				this.getFlux().actions.addTodo(this.state.newTodoText);
				this.setState({newTodoText: ''});
			}
		},

		handleTodoTextChange: function(e) {
			this.setState({newTodoText: e.target.value});
		}
	});

	var TodoItem = React.createClass({
		mixins: [FluxMixin],

		propTypes: {
			todo: React.PropTypes.object.isRequired
		},

		render: function() {
			var textDecoration = this.props.todo.complete ? 'line-through' : '';
			return (
				<span style={{textDecoration: textDecoration}} onClick={this.onClick}>{this.props.todo.text}</span>
			);
		},

		onClick: function() {
			this.getFlux().actions.toggleTodo(this.props.todo);
			// this.getFlux().dispatch('TOGGLE_TODO', {this.props.todo});
		}
	});

	return {
		render: function(flux, el) {
			React.render(<Application flux={flux} />, el);
		}
	};

});
