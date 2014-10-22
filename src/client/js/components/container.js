/** @jsx React.DOM */
var React = require('react')
	, SetIntervalMixin = require('../mixins/setInterval')
    , Button = require('./controls/button')
    , ListItem = require('./listItem')
    , NewItemForm = require('./newItemForm')
    , ItemsService = require('../services/items');

var Container = React.createClass({
    getInitialState: function() {
        this.items = [];

        return {
            items: []
        };
    }

	, componentWillMount: function() {
        this.itemsService = new ItemsService();
        this.itemsService.firebaseRef.on('child_added', function(childSnapshot) {
            // Only keep track of 25 items at a time
            if (this.items.length === 25) {
                this.items.splice(0, 1);
            }

            this.items.push({
                name: childSnapshot.ref().name()
                , data: childSnapshot.val()
            });
            this.setState({
                items: this.items
            });
        }.bind(this));

        this.itemsService.firebaseRef.on('child_removed', function(childSnapshot) {
            var name = childSnapshot.ref().name();

            this.items.some(function (item, index) {
                if (item.name === name) {
                    this.items.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
            }, this);

            this.setState({
                items: this.items
            });
        }.bind(this));
    }

    , componentWillUnmount: function() {
        this.itemsService.destroy();
    }

    , addNewItem: function(item) {
        return this.itemsService.addNewItem(item);
    }

    , deleteItemWithName: function(itemName) {
        return this.itemsService.deleteItemWithName(itemName);
    }

	, render: function() {
        var self = this;

		return (
			/* jshint ignore:start */
			<section>
                <NewItemForm onAdd={ this.addNewItem } />
                <p>Total: { this.state.items.length }</p>
				<ul>{
                    this.state.items.map(function(item) {
                        return <ListItem key={item.name} item={item} onDelete={ self.deleteItemWithName } />
                    })
                }
				</ul>
			</section>
			/* jshint ignore:end */
		);
	}
});

module.exports = Container;