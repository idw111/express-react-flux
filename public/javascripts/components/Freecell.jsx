define([
	'react'
], function(React) {

	/**
	 * - FreecellGame
	 *   - Freecells
	 *     - Freecell
	 *       - Card
	 *   - Homecells
	 *     - Homecell
	 *       - Card
	 *   - Decks
	 *     - Deck
	 *       - Card
	 */
	
	var FreecellGame = React.createClass({
		render: function() {
			var cardPiles = [
				[{name: '1 1'}],
				[{name: '2 2'}],
				[{name: '3 3'}],
				[{name: '1 4'}],
				[{name: '2 5'}],
				[{name: '4 6'}],
				[{name: '1 7'}],
				[{name: '2 8'}, {name: '2 1'}]
			];
			return (
				<div className='freecell-game'>
					<Decks cardPiles={cardPiles} />
				</div>
			);
		}
	});

	var Decks = React.createClass({
		render: function() {
			var decks = this.props.cardPiles.map(function(cardPile, index) {
				return (
					<li key={index}>
						<Deck cards={cardPile} />
					</li>
				);
			});
			return (
				<ul className='decks'>
					{decks}
				</ul>
			);
		}
	});

	var Deck = React.createClass({
		render: function() {
			var cards = this.props.cards.map(function(card, index) {
				return (
					<Card key={index} card={card} />
				);
			});
			return (
				<ul className='deck'>
					{cards}
				</ul>
			);
		}
	});

	var Card = React.createClass({
		handleMouseDown: function(e) {
			console.log(e);
		},

		render: function() {
			var x = -(parseInt(this.props.card.name.split(' ')[0], 10) - 1) * (71 * 2);
			var y = -(parseInt(this.props.card.name.split(' ')[1], 10) - 1) * 96;
			return (
				<li className='card' style={{backgroundPosition: x + 'px ' + y + 'px'}} onMouseDown={this.handleMouseDown}></li>
			);
		}
	});

	var render = function(el) {
		React.render(<FreecellGame />, el);
	};

	return {
		render: render
	};

});