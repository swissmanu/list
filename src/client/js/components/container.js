/** @jsx React.DOM */
var React = require('react')
	, Button = require('./controls/button')
    , ListItem = require('./listItem')
    , CreateNewListItem = require('./createNewListItem')
    , NewItemForm = require('./newItemForm')
	, ItemStore = require('../stores/ItemStore');

var Container = React.createClass({
    getInitialState: function() {
        return {
            items: ItemStore.getAll()
        };
    }

	, componentDidMount: function() {
		ItemStore.addChangeListener(this._onChange);
	}

    , componentWillUnmount: function() {
        ItemStore.removeChangeListener(this._onChange);
    }

	, _onChange: function() {
		this.setState({
			items: ItemStore.getAll()
		});
	}

	, render: function() {
        var self = this;

		return (
			/* jshint ignore:start */
			<section className="container">
                <NewItemForm onAdd={ this.addNewItem } />
                <p>Total: { this.state.items.length }</p>
				<ul>
                    {
                        this.state.items.map(function(item) {
                            return <ListItem key={item.name} item={item} />
                        })
                    }
				</ul>
			</section>
			/* jshint ignore:end */
		);
	}
});

module.exports = Container;
